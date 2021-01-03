const pg = require('pg')
const debug = require('debug')('pg:connection')
const { dbUrl } = require('./env-variables')

const client = new pg.Client(dbUrl)
const connection = async (cb) => {
  try {
    await client.connect(
      client.query('SELECT NOW() AS "theTime"', (err, result) => {
        if (err) {
          return console.error('error running query', err)
        }
        debug(`Postgres DB Connected ${result.rows[0].theTime}`)
      })
    )
  } catch (error) {
    cb(error)
  }
}

module.exports = { connection, client };
