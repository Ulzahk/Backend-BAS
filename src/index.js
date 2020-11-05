const express = require('express')
const { port } = require('./config')

// API
const api = express()

//PostgreSQL Connection


// Body Parser
api.use(express.json({ extended: true, limit: '5mb'}))

//Cors
api.use(cors())

//Routes
api.get('/', (req, res) => {
  res.send('Server Status: [🟢 Online]\nFor more information visit: https://github.com/Ulzahk/Backend-BAS')
})

const server = api.listen(port, () => {
  console.log(`Server listening at http://localhost:${server.address().port}`)
})
