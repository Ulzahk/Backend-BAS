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
    const userCreated = await client.query(`SELECT * FROM users WHERE user_id=${userId}`)
    return userCreated.rows[0]
  } catch (error) {
    console.error(error)
  }
}

const createUser = async (user) => {
  const { username, password, email, firstname, lastname } = user
  try {
    const encriptedPassword = await bcrypt.hash(password, 10)
    const lowerCaseEmail = email.toLowerCase()
    const confirmed_email = false
    const user = await client
      .query(`INSERT INTO users 
    (username, password, email, firstname, lastname, confirmed_email) VALUES 
    ('${username}', '${encriptedPassword}', '${lowerCaseEmail}','${firstname}', '${lastname}', ${confirmed_email})`)
    return user.rowCount
  } catch (error) {
    console.error(error)
  }
}

const updateUser = async (userId, user) => {
  const { username, password, email, firstname, lastname } = user
  try {
    const lowerCaseEmail = email.toLowerCase()
    const encriptedPassword = await bcrypt.hash(password, 10)
    const userUpdated = await client
      .query(`UPDATE users 
    SET username='${username}', password='${encriptedPassword}', email='${lowerCaseEmail}', firstname='${firstname}', lastname='${lastname}' 
    WHERE user_id=${userId}`)
    return userUpdated.rowCount
  } catch (error) {
    console.error(error)
  }
}

const deleteUser = async (userId) => {
  try {
    const userDeleted = await client.query(`DELETE FROM users WHERE user_id=${userId}`)
    return userDeleted.rowCount
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}
