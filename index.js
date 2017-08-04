const express = require('express')
const app = express()
const ip = require('ip')
const bodyParse = require('body-parser')
const timeout = require('connect-timeout')
const cookieParse = require('cookie-parser')
const cors = require('cors')

const port = process.env.port || '7000'
const user = require('./router/user')

app.use(cors())
app.use(timeout('100s'))
app.use(cookieParse())
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use('/user', user)

app.listen(port, () => {
  console.info('server running http://%s:%s', ip.address(), port)
})
