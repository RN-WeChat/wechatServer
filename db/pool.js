const mysql = require('mysql')
const Pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'YXLyxl94829',
  database: 'wechat'
})

module.exports = Pool