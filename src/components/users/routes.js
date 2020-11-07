const express = require('express')
const usersController = require('./controller')
const ApiUser = (api) => {
  const router = express.Router()
  api.use('/users', router)

  router.get('/', async (req, res, next) => {
    try {
      const users = await usersController.getUsers()
      console.log(users)
      res.status(200).json({
        message: 'Users listed',
        total_results: users.length,
        results: users
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:userId', async (req, res, next) => {
    try {
      const user = await usersController.getOneUser(req.params.userId)
      res.status(200).json({
        message: `User ${req.params.userId} listed`,
        result: user
      })
    } catch (error) {
      next(error)
    }
  })
  router.post('/', async (req, res, next) => {
    try {
      const userCreated = await usersController.createUser(req.body)
      if(userCreated === 1){
        res.status(201).json({
          message: `User created`
        })
      } else {
        res.status(502).json({
          message: `Error creating user`
        })
      }
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:userId', async (req, res, next) => {
    try {
      const users = await usersController.deleteUser(req.params.userId)
      if (users !== 0) {
        res.status(201).json({
          message: `User ${req.params.userId} deleted`
        })
      } else {
        res.status(406).json({
          message: `Error deleting user ${req.params.userId}`
        })
      }
    } catch (error) {
      next(error)
    }
  })
}

module.exports = ApiUser