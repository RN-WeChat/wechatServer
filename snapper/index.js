socketIo = require('socket.io')
Io = require('./io')
const request = require('request')
const config = require('../config')

module.exports = exports = (server) => {
  const socket = socketIo(server, {
    'path': '/wechat',
    "pingInterval": 10000,
    "pingTimeout": 5000,
    "cokie": false
  })

  socket.on('connection', (client) => {
    Io.add(client)

    client.on('clientSendMessage', (data) => {
      const $promise = handleRecieveClientMessage(data)
      $promise.then((result) => {
        socket.emit('serverSendMessage', { message: result.message })
      })
    })

    client.on('disconnect', (client) => {
      Io.remove(client)
    })
  })
}

function handleRecieveClientMessage(data = {}) {
  return new Promise((resolve) => {
    const { messageTemplate = {}, robotApiconfig = {} } = config
    const options = {
      url: robotApiconfig.url,
      method: 'POST',
      json: true,
      headers: {
        "Content-Type": "application/json",
        "charset": "UTF-8"
      }
    }
    messageTemplate.info = data.message
    options.body = messageTemplate
    request(options, (err, result = {}) => {
      if (err || result.statusCode !== 200 ||
        Object.keys(result.body).length === 0) {
        resolve({ message: '啊哦，查找失败' })
      } else {
        const reply = {
          message: result.body.text
        }
        if (result.body.url) {
          reply.url = result.body.url
        }
        resolve(reply)
      }
    })
  })
}