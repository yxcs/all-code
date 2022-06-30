import socketio from 'socket.io'
import http from 'http'

// socket.io
let server = http.createServer().listen(2200)
const io = socketio(server)

io.on('connection', function (clientSocket) {
  clientSocket.on('sendMsg', function (data) {
    console.log('---------------------------->', data)
    clientSocket.emit('receiveMsg', data);
  })
})