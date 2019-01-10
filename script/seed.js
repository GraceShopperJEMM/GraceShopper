'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'Regular Duck',
      price: 1999,
      color: 'Yellow',
      stock: 8,
      size: 'Medium',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/8166xCVDGnL._SY355_.jpg'
    }),
    Product.create({
      name: 'Punk Rock Duck',
      price: 2999,
      color: 'Blue',
      stock: 3,
      size: 'Small',
      imageUrl: 'http://www.blueduck7.com/blueduck.png'
    })
  ])

  const users = await Promise.all([
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
      cart: [1, 2]
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      cart: [1]
    }),
    User.create({
      name: 'TopDawg',
      email: 'tdawg@email.com',
      password: '123',
      isAdmin: true
    })
  ])

  const exampleUserEmail = (await User.findOne({where: {id: users[0].id}}))
    .dataValues.email

  const orders = await Promise.all([
    Order.create({
      address: '51 Greenacres Ave',
      email: 'notsignedin@email.com'
    }),
    Order.create({
      address: '123 Brite Ave',
      userId: users[0].id,
      email: exampleUserEmail
    }),
    Order.create({
      address: '100 Brite Ave',
      userId: users[0].id,
      email: exampleUserEmail
    }),
    Order.create({
      address: '51 Greenland Ave',
      email: 'murphy@email.com',
      userId: users[1].id
    })
  ])

  const productsOrdered = await Promise.all([
    ProductOrder.create({
      // orderId: orders[0].id,
      productId: products[0].id
    }),
    ProductOrder.create({
      // orderId: orders[0].id,
      productId: products[1].id
    })
  ])
  await orders[2].setProductOrders([productsOrdered[0].id])
  console.log(await orders[0].getProductOrders())

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${productsOrdered.length} product order map`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
