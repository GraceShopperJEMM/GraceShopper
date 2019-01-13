const Sequelize = require('sequelize')
const db = require('../db')

//Given productId and orderId
const ProductOrder = db.define('productOrder', {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = ProductOrder
