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
    const { userId } = req.params;
    try {
      const user = await usersService.getUserById({ userId });
      res.status(200).json({
        message: 'User listed',
        user: user
      })
    } catch (err) {
      next(err);
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
          message: `User ${req.params.userId} deleted`
        })
      } else {
        res.status(406).json({
          message: `Error deleting user with ID:${req.params.userId}`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async loginUser (req, res, next){
    const { email, password } = req.body;
    try {
      if(!email || !password){
        res.status(401).send('Invalid information');
      }

      const user = await usersService.getUserByEmail({email});
      if(!user){
        res.status(401).send('Invalid information');
      }

      const comparedPassword = await bcrypt.compare(password, user.password);
      if(comparedPassword){
        const token = jwtAuthenticationService.JWTIssuer({user: user.id}, '15 min');
        res.status(200).json({
          token: token
        })
      } else {
        res.status(401).send('Invalid information');
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UsersController;