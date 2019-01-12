const router = require('express').Router()
const Sequelize = require('sequelize')
const {Product} = require('../db/models')
module.exports = router

const Op = Sequelize.Op

// route for guests to be able to view their shopping cart
// receives an array of product IDs from the front-end

// responds with an array of objects containing product details
router.put('/cart', async (req, res, next) => {
  try {
    const guestCart = JSON.parse(req.body.cart)
    const cartIds = guestCart.map(itemID => {
      return {id: itemID}
    })
    const guestCartItems = await Product.findAll({
      where: {
        [Op.or]: cartIds
      }
    })
    res.json(guestCartItems)
  } catch (error) {
    next(error)
  }
})
