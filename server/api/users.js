const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

//route to get individual user info
//only allows access if one is an admin, or if one is requesting their
//own data only
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

router.get('/:id/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const [cart] = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          isCart: true
        },
        include: [
          {
            model: ProductOrder,
            include: [
              {
                model: Product
              }
            ]
          }
        ],
        defaults: {
          isCart: true
        }
      })
      res.json(cart)
    } else {
      res.send("illegal attempt: you shouldn't be looking there")
    }
  } catch (err) {
    console.log(err.message)
    next(err)
  }
})

router.post('/:id/addToCart', async (req, res, next) => {
  try {
    const productId = req.body.productId

    if (req.user && req.user.id) {
      const [cart] = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          isCart: true
        },
        include: [
          {
            model: ProductOrder,
            include: [
              {
                model: Product
              }
            ]
          }
        ],
        defaults: {
          isCart: true
        }
      })
      const po = await ProductOrder.create({
        productId,
        orderId: cart.id
      })
      const oldCart = await cart.getProductOrders()
      oldCart.push(po)

      await cart.setProductOrders(oldCart)
      cart.save()
      res.send('successfully added to cart')
    } else {
      res.send("illegal attempt: you shouldn't be looking there")
    }
  } catch (error) {
    next(error)
  }
})

//allows admin to access all user data
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

//allows user to access their order data
router.get('/:id/orderHistory', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.id)) {
      const orders = await Order.findAll({
        where: {userId: req.params.id, isCart: false},
        include: [
          {
            model: ProductOrder,
            include: [
              {
                model: Product
              }
            ]
          }
        ]
      })

      res.json(orders)
    } else {
      res.send('you are not authorized to see this information')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id/placeOrder', async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.id)) {
      const cartOrders = await Order.findOne({
        where: {
          userId: req.params.id,
          isCart: true
        },
        include: [
          {
            model: ProductOrder
          }
        ]
      })
      cartOrders.dataValues.productOrders.map(async product => {
        const productData = await Product.findOne({
          where: {
            id: product.dataValues.id
          }
        })
        if (productData) {
          const price = productData.price
          product.update({
            price
          })
        }
      })
      res.send('successfully checked out!')
    }
  } catch (error) {
    next(error)
  }
})
