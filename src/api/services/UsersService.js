const { client } = require('../../config/database');
const { v4: uuid }  = require('uuid');
const bcrypt = require('bcrypt');

class UsersService {
  constructor(){
    this.table = 'users',
    this.fields = 'id, username, password, email, full_name, confirmed_email'
  }

  async createUser({ user }){
    const { username, password, email, fullName } = user
    try {
      const id = uuid();
      const encriptedPassword = await bcrypt.hash(password, 10);
      const lowerCaseEmail = email.toLowerCase();
      const confirmed_email = false;
      const userCreated = await client.query(
        `INSERT INTO ${this.table}(${this.fields}) VALUES (
          '${id}',
          '${username}',
          '${encriptedPassword}',
          '${lowerCaseEmail}',
          '${fullName}',
          ${confirmed_email}
        )`
      )
      return userCreated.rowCount;
    } catch (err) {
      console.error(err);
    }
  }

  async getUsers(){
    try {
      const users = await client.query(`SELECT * FROM ${this.table}`)
      return users.rows || [];
    } catch (err) {
      console.error(err);
    }
  }

  async getUserById({ userId }){
    try {
      const user = await client.query(`SELECT * FROM ${this.table} WHERE id='${userId}'`)
      return user.rows[0] || [];
    } catch (err) {
      console.error(err);
    }
  }

  async getUserByEmail({ email }){
    try {
      const lowerCaseEmail = email.toLowerCase()
      const user = await client.query(`SELECT * FROM ${this.table} WHERE email='${lowerCaseEmail}'`)
      return user.rows[0] || [];
    } catch (err) {
      console.error(err)
    }
  }

  async updateUser({ userId, user }){
    const { username, password, email, fullName} = user
    try {
      const lowerCaseEmail = email.toLowerCase()
      const encriptedPassword = await bcrypt.hash(password, 10)
      const userUpdated = await client.query(
        `UPDATE ${this.table} 
        SET username='${username}', password='${encriptedPassword}', email='${lowerCaseEmail}', full_name='${fullName}' 
        WHERE id='${userId}'`
      )
      return userUpdated.rowCount
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser({ userId }){
    try {
      const userDeleted = await client.query(`DELETE FROM ${this.table} WHERE id='${userId}'`)
      return userDeleted.rowCount;
    } catch (error) {
      console.error(error);
    }
  }
}


module.exports = UsersService;