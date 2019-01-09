const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const user = await User.findById(req.params.id)
      res.json(user)
    } else if (req.user.id === parseInt(req.params.id)) {
      const user = await User.findById(req.params.id)
      res.json(user)
    } else {
      res.send("illegal attempt: you shouldn't be looking there")
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll()
      res.json(users)
    } else {
      res.send("you're not an administrator, sorry")
    }
  } catch (err) {
    next(err)
  }
})
