const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/guests', require('./guests'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
