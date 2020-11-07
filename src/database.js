const pg = require('pg')
const { dbUrl } = require('./config')

const client = new pg.Client(dbUrl)
/* client.connect((err) => {
  if(err){
    return console.log('Could not connect to PostgresSQL', err)
  }
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if(err){
      return console.error('error running query', err)
    }
    console.log(result.rows[0].theTime)
    client.end()
  })
}) */


const connection = async (cb) => {
  try {
    await client.connect(
      client.query('SELECT NOW() AS "theTime"', (err, result) => {
        if(err){
          return console.error('error running query', err)
        }
        console.log(result.rows[0].theTime)
      })
    )
    console.log('Postgres DB Connected')
  } catch (error) {
    cb(error)
  }
}

module.exports = { connection, client }
