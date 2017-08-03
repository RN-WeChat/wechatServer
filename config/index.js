const robotApiconfig = {
  apiKey: "f732bc5d2a2948cd8ea9c270f8906a31",
  apiKey1: "1307535d73654911b678c74a0b189b75",
  secret: '92b3ca6dd424c534',
  url: 'http://www.tuling123.com/openapi/api',
  userid: '1300402232'
}

const messageTemplate = {
    "key": robotApiconfig.apiKey,
    "userid": robotApiconfig.apiKey,
    "info": ''
}

const outConfig = {
  robotApiconfig,
  messageTemplate
}

module.exports = outConfig