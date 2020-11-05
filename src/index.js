const express = require('express')

// API
const api = express()

api.get('/', (req, res) => {
  res.send(`Server Status: [🟢 Online]\nFor more information visit: https://github.com/Ulzahk/Backend-BAS`)
})

const server = api.listen(3000, (req, res) =>{
  console.log(`Server listening at http://localhost:${server.address().port}`)
})