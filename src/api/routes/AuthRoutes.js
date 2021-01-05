const express = require('express');
const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

const authAPI = (api) => {
  const router = express.Router();
  api.use('/api/v1/auth', router);
  
  // Login An User
  router.post('/user', usersController.loginUser);
}

module.exports = authAPI;