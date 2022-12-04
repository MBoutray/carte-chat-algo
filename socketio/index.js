require('dotenv').config()

const Room = require('../nuxt/models/rooms')
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

// rooms dataset
const rooms = [
  new Room(1),
  new Room(2),
  new Room(3),
  new Room(4)
]

// Socket connection
io.on('connection', (socket) => {
  // When user is connected to socket
  console.log(`[+] ${socket.id} from ${socket.handshake.auth.conv_id}`)

  // When received a new message from user
  socket.on('send_message', (payload) => {
    // find the room
    const room = rooms.find((room) => room.id === payload.room.id)

    // get the next message id
    const nextMessageId = room.messages.length + 1

    // add the message to the room
    room.addMessage({ id: nextMessageId, user: payload.user, content: payload.content })

    // Send to the the users in the same chat room
    io.to(payload.room.name).emit('emit_message', rooms)
  })

  // When user joined a chatroom
  socket.on('user_joined_room', (room, user, callback) => {
    socket.join(room.name)

    // Find the room in the rooms dataset
    const roomFound = rooms.find((r) => r.id === room.id)

    // Add the user to the room
    roomFound.addUser(user)

    // Send to the users in the same chat room
    io.to(room.name).emit('user_joined_room', rooms)

    console.log(`user ${socket.id} joined channel ${room.name}`)

    callback(roomFound)
  })

  // When user left chatroom
  socket.on('user_left_room', (room, user) => {
    // Find the room in the rooms dataset
    const roomFound = rooms.find((r) => r.id === room.id)

    // Remove the user from the room
    roomFound.removeUser(user)

    // Send the new data to the users in the same chat room
    io.to(room.name).emit('user_left_room', rooms)

    socket.leave(room.name)
    console.log(`user ${socket.id} left channel ${room.name}`)
  })

  // When the user connects to the app
  socket.on('login', (username, callback) => {
    // Check if the user is in the users array
    if (users.some((u) => u.username === username)) {
      // If yes, return an error saying that the user is already connected
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

      // Return the user
      callback({ status: 'ok', content: { user: user, rooms: rooms } })
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

  // When the user modifies map data
  socket.on('user-map-data', (data) => {
    if (data.user) {
      // Find the room in the rooms dataset
      let roomFound = rooms.find((r) => r.users.some((u) => u.id === data.user.id))

      if (roomFound) {
        // Find the user data in the room to update
        let userData = roomFound?.map.userData.find((u) => u.id === data.user.id)

        // Update the user data
        if (userData) {
          roomFound.map.rdv = data.rdv
          userData.resto = data.restoSelected
          userData.position = data.userPosition
        } else {
          roomFound.map.rdv = data.rdv
          roomFound.map.userData.push({
            id: data.user.id,
            username: data.user.username,
            resto: data.restoSelected,
            position: data.userPosition
          })
        }

        // Send the new data to the users in the same chat room
        io.to(roomFound.name).emit('server-map-data', rooms)
      }
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
