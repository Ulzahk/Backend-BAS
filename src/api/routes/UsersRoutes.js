const express = require('express');
const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

const usersAPI = (api) => {
  const router = express.Router();
  api.use('/api/v1/users', router);

  // Create An User
  router.post('/', usersController.createUser);

  // List All Users
  router.get('/', usersController.listUsers);

  // List An User
  router.get('/user-data', usersController.listUserById);

  // Update An User
  router.put('/:userId', usersController.updateUser);

  // Delete An User
  router.delete('/:userId', usersController.deleteUser);
};

module.exports = usersAPI;