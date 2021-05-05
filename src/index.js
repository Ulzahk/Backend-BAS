const express = require('express');
const database = require('./config/database')
const debug = require('debug')('api:server');
const cors = require('cors')
const { port } = require('./config/env-variables');
const userAPI = require('./api/routes/UsersRoutes');
const authAPI = require('./api/routes/AuthRoutes');
const cardAPI = require('./api/routes/CardsRoutes');

// API
const api = express()

// PostgreSQL Connection
database.connection()

// Body Parser
api.use(express.json({ extended: true, limit: '5mb' }))

// Cors
const whiteList = [
  'https://frontend-bas-ulzahk-git-development-ulzahk.vercel.app/',
  'https://frontend-bas-ulzahk.vercel.app/'
]
const corsOptions = {
  origin:  (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
api.use(cors(corsOptions))

// Routes
userAPI(api);
authAPI(api);
cardAPI(api);
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
