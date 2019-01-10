import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

//Components
import {SingleProduct} from './SingleProduct'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.addToCart = this.addToCart.bind(this)
  }

  async componentDidMount() {
    const products = (await axios.get('/api/products')).data
    this.setState({
      products
    })
  }

  render() {
    return (
      <div id="products-container">
        {this.state.products.map(product => {
          return (
            <SingleProduct
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              color={product.color}
              size={product.size}
              imageUrl={product.imageUrl}
              addToCart={this.addToCart}
            />
          )
        })}
      </div>
    )
  }

  addToCart(id) {
    //LOGGED IN USER
    if (this.props.isLoggedIn) {
      console.log('logged in, request to add to cart')
    } else {
      //GUEST
      let oldCart = JSON.parse(localStorage.getItem('cart'))
      if (!oldCart) oldCart = []
      oldCart.push(id)
      localStorage.setItem('cart', JSON.stringify(oldCart))
    }
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    tab: state.tab
  }
}
export default connect(mapState, null)(AllProducts)
