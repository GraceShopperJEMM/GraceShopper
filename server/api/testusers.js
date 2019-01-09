const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

// User.findAll({
//   where: {id: 1},
//   include: [{Order}, {through: {Product}}]
// }).then(x => {
//   console.log(x)
// })

Order.findAll({
  where: {userId: 1},
  include: [
    {
      model: Product,

      through: {
        attributes: ['productId', 'orderId']
      }
    }
  ]
}).then(projects => {
  console.log(projects[0].products)
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     if (req.user && req.user.isAdmin) {
//       const user = await User.findById(req.params.id)
//       res.json(user)
//     } else if (req.user.id === parseInt(req.params.id)) {
//       const user = await User.findById(req.params.id)
//       res.json(user)
//     } else {
//       res.send("illegal attempt: you shouldn't be looking there")
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/', async (req, res, next) => {
//   try {
//     if (req.user && req.user.isAdmin) {
//       const users = await User.findAll()
//       res.json(users)
//     } else {
//       res.send("you're not an administrator, sorry")
//     }
//   } catch (err) {
//     next(err)
//   }
// })
