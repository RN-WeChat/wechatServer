socketIo = require('socket.io')

const subScribe = {}

module.exports = exports = (server) => {
  const io = socketIo(server, {
    'path': '/wechat',
    "pingInterval": 10000,
    "pingTimeout": 5000,
    "cokie": false
  })

  io.on('connection', (client) => {
    const { id } = client
    subScribe[id] = client
  })

  io.on('disconnect', (client) => {
    const { id } = client
    delete subScribe[id]
  })

}