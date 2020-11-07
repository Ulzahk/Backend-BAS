const express = require('express')
const database = require('./database')
const cors = require('cors')
const { port } = require('./config')
const ApiUser = require('./components/users/routes')

// API
const api = express()

//PostgreSQL Connection
database.connection()

// Body Parser
api.use(express.json({ extended: true, limit: '5mb'}))

//Cors
api.use(cors())

//Routes
ApiUser(api)

api.get('/', (req, res) => {
  res.send('Server Status: [🟢 Online]\nFor more information visit: https://github.com/Ulzahk/Backend-BAS')
})

const server = api.listen(port, () => {
  console.log(`Server listening at http://localhost:${server.address().port}`)
})
