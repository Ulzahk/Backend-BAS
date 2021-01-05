const express = require('express');
const database = require('./config/database')
const debug = require('debug')('api:server');
const cors = require('cors')
const { port } = require('./config/env-variables');
const userAPI = require('./api/routes/UsersRoutes');

// API
const api = express()

// PostgreSQL Connection
database.connection()

// Body Parser
api.use(express.json({ extended: true, limit: '5mb' }))

// Cors
api.use(cors())

// Routes
userAPI(api);
authAPI(api);
api.get('/', (req, res) => {
  res.send(`
  <div style="text-align: center;">
    <p>
      Server Status: [🟢 Online]
    </p>
    <p>
      For more information visit: 
      <a href='https://github.com/Ulzahk/Backend-BAS' alt='Link to Backed-BAS Repository' target='_blank'>
        https://github.com/Ulzahk/Backend-BAS
      </a>
    </p>
  </div>
  `)
})

// Server
const server = api.listen(port, () => {
  debug(`Server listening at http://localhost:${server.address().port}`)
})
