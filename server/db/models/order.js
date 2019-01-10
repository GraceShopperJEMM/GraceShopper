const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Order
