const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrders = db.define('productOrders', {
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = ProductOrders
