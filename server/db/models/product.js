const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0.0
  },
  color: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.ENUM,
    values: ['Small', 'Medium', 'Large'],
    allowNull: false,
    defaultValue: 'Small'
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product
