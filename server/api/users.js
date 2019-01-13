const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

// route to get individual user info
// only allows access if one is an admin, or if one is requesting their
// own data only
router.get('/:id', async (req, res, next) => {
  try {
    if (
      (req.user && req.user.isAdmin) ||
      req.user.id === Number(req.params.id)
    ) {
      const user = await User.findById(req.params.id)
      res.json(user)
    } else {
      res.send("illegal attempt: you shouldn't be looking there")
    }
  } catch (error) {
    next(error)
  }
})

// api route to update logged in user's profile details
// router.put('/:id', async (req, res, next) => {
//   try {
//     if (
//       (req.user && req.user.isAdmin) ||
//       req.user.id === Number(req.params.id)
//     ) {
//       const user = await User.findById(req.params.id)
//       await user.update({
//         name: req.body.name || user.name,
//         email: req.body.email || user.email
//       })
//       res.json(user)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// allows admin to access all user data
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

// allows user to access their order data
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
