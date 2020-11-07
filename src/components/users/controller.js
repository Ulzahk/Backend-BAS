const { client } = require('../../database')
const bcrypt = require('bcrypt')

const getUsers = async () => {
  try {
    const users = await client.query('SELECT * FROM USERS')
    return users.rows
  } catch (error) {
    console.error(error)
  }
}

const getOneUser = async (userId) => {
  try {
    const user = await client.query(`SELECT * FROM users WHERE user_id=${userId}`)
    return user.rows[0]
  } catch (error) {
    console.error(error)
  }
}

const createUser = async (user) => {
  let {username, password, email, firstname, lastname } = user
  try {
    let encriptedPassword = await bcrypt.hash (password, 10)
    let lowerCaseEmail = email.toLowerCase()
    const confirmed_email = false
    const user = await client.query(`INSERT INTO users 
    (username, password, email, firstname, lastname, confirmed_email) VALUES 
    ('${username}', '${encriptedPassword}', '${lowerCaseEmail}','${firstname}', '${lastname}', ${confirmed_email})`)
    return user.rowCount
  } catch (error) {
    console.error(error)
  }
}


const deleteUser = async (userId) => {
  try {
    const user = await client.query(`DELETE FROM users WHERE user_id=${userId}`)
    return user.rowCount
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  deleteUser
}