import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {populateGuestCart, getCartFromServer} from '../store'

// Components
import {SingleProduct} from './SingleProduct'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }

  render() {
    return (
      <div id="products-container">
        {this.props.products.map(product => {
          return (
            <SingleProduct
              key={product.id}
              name={product.name}
              price={product.price}
              color={product.color}
              size={product.size}
              imageUrl={product.imageUrl}
              id={product.id}
              addToCart={this.addToCart}
            />
          )
        })}
      </div>
    )
  }

  async addToCart(id) {
    // LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      await axios.post(
        `/api/users/${this.props.user.id}/addToCart`,
        `productId=${id}`
      )
      this.props.updateUserCart(this.props.user.id)
    } else {
      // GUEST
      let oldCart = JSON.parse(localStorage.getItem('cart'))
      if (!oldCart) oldCart = []
      let foundProd = false
      for (let i = 0; i < oldCart.length; i++) {
        if (oldCart[i].id === id) {
          foundProd = true
          oldCart[i].quantity = oldCart[i].quantity + 1
          break
        }
      }
      if (!foundProd) {
        oldCart.push({id, quantity: 1})
      }
      localStorage.setItem('cart', JSON.stringify(oldCart))
      this.props.updateGuestCart()
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGuestCart() {
      dispatch(populateGuestCart())
    },
    updateUserCart(userId) {
      dispatch(getCartFromServer(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
