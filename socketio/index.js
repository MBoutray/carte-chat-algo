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

// Socket connection
io.on('connection', (socket) => {
  // When user is connected to socket
  console.log(`[+] ${socket.id} from ${socket.handshake.auth.conv_id}`)

  // When received a new message from user
  socket.on('send_message', (payload) => {
    console.log('message received', payload)
    io.to(payload.room.name).emit('emit_message', {
      user: payload.user,
      content: payload.content
    })
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
  socket.on('login', (user) => {})

  // When the user disconnects from the app
  socket.on('logout', (user) => {})

  // When user disconnect from socket
  socket.on('disconnect', () => {
    console.log(`[-] ${socket.id} from ${socket.handshake.auth.conv_id}`)
  })
})

httpServer.listen(process.env.SOCKET_PORT, function () {
  console.log(`Votre app est disponible sur localhost:${process.env.SOCKET_PORT} !`)
})
