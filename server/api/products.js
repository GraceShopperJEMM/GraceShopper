const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const name = req.body.name
      const price = Number(req.body.price) * 100 //Store in cents
      const size = req.body.size
      const color = req.body.color
      const imageUrl = req.body.url
      await Product.create({name, price, size, color, imageUrl})
      res.status(201).send('added product')
    } else {
      res.send("illegal attempt: you shouldn't be looking there")
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
