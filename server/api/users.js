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

router.get('/:id/cart', async (req, res, next) => {
  try {
    if (
      req.user &&
      (req.user.isAdmin || req.user.id === Number(req.params.id))
    ) {
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
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.id))) {
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
        // console.log(cart.dataValues.productOrders.map(product => product.dataValues))

        const [po, isNew] = await ProductOrder.findOrCreate({
          where: {
            productId,
            orderId: cart.id
          },
          defaults: {
            productId,
            orderId: cart.id
          }
        })

        if (isNew) {
          const oldCart = await cart.getProductOrders()
          oldCart.push(po)
          await cart.setProductOrders(oldCart)
        } else {
          let updatedQuantity = ++po.quantity
          await po.update({quantity: updatedQuantity})
        }

        cart.save()
        res.send('successfully added to cart')
      } else {
        res.send("illegal attempt: you shouldn't be looking there")
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(401).send('Not Authorized')
  }
})

router.delete('/:id/cart/delete', async (req, res, next) => {
  const productToDeleteID = req.query.productID
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.id))) {
    try {
      const cart = await Order.findOne({
        where: {
          userId: Number(req.params.id),
          isCart: true
        }
      })
      const productOrderToDelete = await ProductOrder.findOne({
        where: {
          orderId: cart.id,
          productId: productToDeleteID
        }
      })
      await productOrderToDelete.destroy()
      res.status(204).send('Successfully Deleted Item From Cart')
    } catch (err) {
      next(err)
    }
  } else {
    res.status(401).send('Not Authorized')
  }
})

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
    if (req.user.id === Number(req.params.id)) {
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
      // Find cart
      const cartOrder = await Order.findOne({
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
      cartOrder.update({
        isCart: false
      })
      // Set all prices of products in cart
      cartOrder.dataValues.productOrders.map(async product => {
        const productData = await Product.findOne({
          where: {
            id: product.dataValues.productId
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
