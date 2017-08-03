const Pool = require('./pool')

user = {
  query: (name, callback) => {
    Pool.getConnection((error, connection) => {
      if (connection) {
        const sql = `select * from user where userName = '${name}'`
        connection.query(sql, (err, result) => {
          callback(err, result)
        })
      } else {
        callback(error)
      }
    })
  },
  regist: (name, pass, callback) => {
    Pool.getConnection((error, connection) => {
      if (error) {
        callback(error)
      } else {
        const sql = `select * from user where userName = '${name}'`
        connection.query(sql, (queryError, quertResult) => {
          if (queryError) {
            callback(queryError)
          } else {
            if (quertResult && quertResult[0]) {
              callback(new Error('user exist'))
            } else {
              const newSql = `insert into user (userName, password) values('${name}', '${pass}')`
              connection.query(newSql, (insertError, insertResult) => {
                if (insertError) {
                  callback(insertError)
                } else {
                  callback(null, insertResult)
                }
              })
            }
          }
        })
      }
    })
  }
}

module.exports = user

