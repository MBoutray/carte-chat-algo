require('dotenv').config()

const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONT_ENDPOINT,
    methods: ['GET', 'POST']
  }
})

// user dataset
const users = []

// Socket connection
io.on('connection', (socket) => {
  // When user is connected to socket
  console.log(`[+] ${socket.id} from ${socket.handshake.auth.conv_id}`)

  // When received a new message from user
  socket.on('send_message', (payload) => {
    console.log('message received', payload)
    // Send to the the users in the same chat room
    io.to(payload.room.name).emit('emit_message', payload)
  })

  // When user joined a chatroom
  socket.on('user_joined_room', (room) => {
    socket.join(room.name)
    console.log(`user ${socket.id} joined channel ${room.name}`)
  })

  // When user left chatroom
  socket.on('user_left_room', (room) => {
    socket.leave(room.name)
    console.log(`user ${socket.id} left channel ${room.name}`)
  })

  // When the user connects to the app
  socket.on('login', (username, callback) => {
    // Check if the user is in the users array
    if (users.some((u) => u.username === username)) {
      // If yes, return an error saying that the user is already connected
      console.log('user already connected')
      callback({ status: 'error', content: 'Username already taken' })
    } else {
      // If no, add the user to the users array and return the user

      // Find the next available id
      let nextAvailableId = 1

      if (users.length > 0) {
        nextAvailableId = users[users.length - 1].id + 1
      }

      // Create a new user
      const user = { id: nextAvailableId, username: username }

      // Add the user to the users array
      users.push(user)

      console.log('user connected', users)
      // Return the user
      callback({ status: 'ok', content: user })
    }
  })

  // When the user disconnects from the app
  socket.on('logout', (user) => {
    // If the user is in the users array
    if (users.some((u) => u.id === user.id)) {
      // Remove the user from the users array
      users.splice(
        users.findIndex((u) => u.id === user.id),
        1
      )

      // Notify all the users that the user has left the app
      io.emit('user_left', user)
    }
  })

  // When user disconnect from socket
  socket.on('disconnect', () => {
    console.log(`[-] ${socket.id} from ${socket.handshake.auth.conv_id}`)
  })
})

httpServer.listen(process.env.SOCKET_PORT, function () {
  console.log(`Votre app est disponible sur localhost:${process.env.SOCKET_PORT} !`)
})
