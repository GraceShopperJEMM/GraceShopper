import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class ShoppingCart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  componentDidMount() {
    const cart = this.props.user.cart
    console.log(this.props.user)
    console.log('cart', cart)
  }

  render() {
    return (
      <div>
        {this.state.cart.map(item => <div key={item.id}>{item.name}</div>)}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(ShoppingCart)
