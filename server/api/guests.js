const router = require('express').Router()
const Sequelize = require('sequelize')
const {Product, Order, ProductOrder} = require('../db/models')
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

router.put('/placeOrder', async (req, res, next) => {
  try {
    //Create a new Order
    const email = req.body.email
    const address = req.body.address
    const order = await Order.create({
      email,
      address,
      isCart: false
    })
    const guestCart = req.body.cart
    const cartIds = guestCart.map(product => {
      return {id: product.id}
    })
    //Find product prices for items in guest's cart
    const guestCartItems = await Product.findAll({
      where: {
        [Op.or]: cartIds
      }
    })
    //Create ProductOrders and set their prices
    const pos = guestCartItems.map(async (product, i) => {
      const price = product.dataValues.price
      const po = await ProductOrder.create({
        productId: product.id,
        quantity: guestCart[i].quantity,
        price
      })
      return po
    })
    //Set the ProductOrders to the Order we created
    Promise.all(pos).then(result => {
      order.setProductOrders(result)
    })
    res.json('successfully placed order!')
  } catch (error) {
    next(error)
  }
})
