const UsersService = require('../services/UsersService');
const JWTAuthenticationService = require('../services/AuthService');
const bcrypt = require('bcrypt');

const usersService = new UsersService();
const jwtAuthenticationService =  new JWTAuthenticationService();

class UsersController{
  async createUser(req, res, next){
    const {body: user} = req;
    try {
      const createdUser = await usersService.createUser({ user });
      res.status(201).json({
        message: 'User created',
        user: createdUser
      });
    } catch (err) {
      next(err);
    }
  }

  async listUsers(req, res, next){
    try {
      const users = await usersService.getUsers();
      const totalRecords = users.length.toString();
      res.status(200).json({
        message: 'Users listed',
        totalRecords: totalRecords,
        users: users
      })
    } catch (err) {
      next(err);
    }
  }

  async listUserById(req, res, next){
    const { bearertoken } = req.headers;
    if(!bearertoken) res.status(401).json({message: 'Request without token'})

    const tokenData = await jwtAuthenticationService.JWTVerify(bearertoken)
    if(tokenData === undefined) res.status(401).json({message: 'Invalid token'})

    const userId = tokenData.user;

    try {
      const userData = await usersService.getUserById({ userId });
      res.status(200).json({
        message: 'User listed',
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          full_name: userData.full_name,
        }
      })
    } catch (err) {
      console.log('listUserById error: ', err);
    }
  }

  async updateUser(req, res, next){
    const { userId } = req.params;
    const { body: user} = req;
    try {
      const userUpdated = await usersService.updateUser({ userId, user });
      if (userUpdated !== 0) {
        res.status(200).json({
          message: `User with ID:${userId} updated`
        })
      } else {
        res.status(406).json({
          message: `Error updating user with ID:${userId}`
        })
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next){
    const { userId } = req.params;
    try {
      const userDeleted = await usersService.deleteUser({userId});
      if (userDeleted !== 0) {
        res.status(200).json({
          message: `User ${userId} deleted`
        })
      } else {
        res.status(406).json({
          message: `Error deleting user with ID:${userId}`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async loginUser (req, res, next){
    const { user, password } = req.body;
    try {
      if(!user || !password) res.status(401).send('Invalid information');

      let userData;

      const userDataByUsername = await usersService.getUserByUsername({user});
      if(userDataByUsername.length === 0) {
        const userDataByEmail = await usersService.getUserByEmail({user});
        if(userDataByEmail.length === 0) res.status(401).send('Invalid information');
        userData = userDataByEmail;
      } else {
        userData = userDataByUsername;
      };

      const comparedPassword = await bcrypt.compare(password, userData.password);
      if(!comparedPassword) res.status(401).send('Invalid information');
      const token = jwtAuthenticationService.JWTIssuer({user: user.id}, '15 min');
      res.status(200).json({ token: token })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UsersController;