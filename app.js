const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const PORT = process.env.PORT || 4000
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(cors())
app.use(express.json()) // for parsing application/json

let users = {}

io.on('connection', (socket) => {
  console.log('connected', socket.id, socket.request.headers)

  socket.on('refreshLots', (message) => {
    console.log('refreshLots: ', message)

    io.emit('refreshLots', message)
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
    delete users[socket.id]
  })
})

server.listen(PORT, () => {
  console.log(`listening on:${PORT}`)
})
