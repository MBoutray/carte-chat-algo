require('dotenv').config()
// const Message = require('./models/message')
// var createError = require('http-errors')
var express = require('express')
// var path = require('path')
// var cookieParser = require('cookie-parser')
// var logger = require('morgan')
// const jwt = require('jsonwebtoken')

// -----------------------------------------------------------------------
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.FRONT_ENDPOINT,
    methods: ['GET', 'POST']
  }
})

// Socket connection
io.on('connection', (socket) => {
  // When user is connected to socket
  console.log(`[+] ${socket.id} from ${socket.handshake.auth.conv_id}`)

  // When user disconnect from socket
  socket.on('disconnect', () => {
    console.log(`[-] ${socket.id} from ${socket.handshake.auth.conv_id}`)
  })
})

// on change app par server
server.listen(process.env.SOCKET_PORT, function () {
  console.log(`Votre app est disponible sur localhost:${process.env.SOCKET_PORT} !`)
})
