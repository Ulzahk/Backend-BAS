require('dotenv').config()

const config = {
  port: process.env.PORT || 3500,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl: process.env.DB_URL,
  dbApiKey: process.env.DB_API_KEY
}

module.exports = config
