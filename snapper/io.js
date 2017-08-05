function Io() {
  this.subScribe = {}
}

Io.prototype.add = function (client) {
  const { id } = client
  this.subScribe[id] = client
  return this
}

Io.prototype.remove = function (client) {
  const { id } = client
  delete this.subScribe[id]
  return this
}

Io.prototype.sendMessageToClient = function (clientId, message) {
  if (this.subScribe.hasOwnProperty(clientId)) {
    this.subScribe[id].emit('sendMessage', message)
  }
  return this
}

Io.prototype.recieveMessageFromClient = function (clientId, callback = () => { }) {
  if (this.subScribe.hasOwnProperty(clientId)) {
    this.subScribe[id].on('recieveMessage', callback)
  }
  return this
}

module.exports = exports = new Io()