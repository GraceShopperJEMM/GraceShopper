const Sequelize = require('sequelize')
const db = require('../db')

//Given productId and orderId
const ProductOrder = db.define('productOrder', {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = ProductOrder
