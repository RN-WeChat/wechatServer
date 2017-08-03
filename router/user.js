const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('../config')
const db = require('../db/user')

router.get('*', (req, res) => {
  res.status(200).json({ msg: 'success' })
})

router.post('/message', (req, res) => {
  const { body = {} } = req
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
  messageTemplate.info = body.message
  options.body = messageTemplate
  request(options, (err, result = {}) => {
    if (err || result.statusCode !== 200 ||
      Object.keys(result.body).length === 0) {
      return res.status(400).json({ msg: '啊哦，查找失败' })
    } else {
      const reply = {
        text: result.body.text
      }
      if (result.body.url) {
        reply.url = result.body.url
      }
      return res.status(200).json({ message: reply })
    }
  })
})

router.post('/login', (req, res) => {
  const { name, pass } = req.body
  db.query(name, (err, result) => {
    if (result && result[0] && result[0].password === pass) {
      res.status(200).json({ code: 200, msg: 'login Success' })
    } else {
      res.status(400).json({ code: 400, msg: 'login faild' })
    }
  })
})

router.post('/regist', (req, res) => {
  const { name, pass } = req.body
  db.regist(name, pass, (err, result) => {
    if (err || !result || (result && result.affectedRows !== 1)) {
      res.status(400).json({ code: 400, msg: 'regist faild' })
    } else {
      res.status(200).json({ code: 200, msg: 'regist success' })
    }
  })
})

module.exports = router