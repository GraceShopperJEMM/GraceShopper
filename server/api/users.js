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
    const [cart] = await Order.findOrCreate({
      where: {
        userId: Number(req.params.id),
        isCart: true
      },
      defaults: {
        isCart: true
      }
    })
    console.log(cart.get({plain: true}))
    res.json(cart)
  } catch (err) {
    console.log(err.message)
    next(err)
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
        where: {userId: req.params.id},
        include: [
          {
            model: ProductOrder,
            include: [
              {
                model: Product
                // through: {
                //   attributes: ['productId']
                // }
              }
            ]

            // through: {
            //   attributes: ['productId', 'orderId']
            // }
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
