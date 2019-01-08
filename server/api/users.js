const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll()
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const user = await User.findById(req.params.id)
      res.json(user)
    }
    if (req.user && req.admin) {
      const users = await User.findAll()
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user && req.admin) {
      const user = await User.findById(req.params.id)
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})
