import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getProductView} from '../store/viewProduct'

import FullPageSingleProduct from './SingleProductFullPageView'
import store from '../store/index'

//Components
import {SingleProduct} from './SingleProduct'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
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
    console.log('testing props here', this.props)
  }

  render() {
    return this.props.productInfo === 0 ? (
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
              idProp={product.id}
              selectProd={this.props.viewFullProduct}
            />
          )
        })}
      </div>
    ) : (
      <div>
        <FullPageSingleProduct data={this.props} />
      </div>
    )
  }

  addToCart(id) {
    //LOGGED IN USER
    if (this.props.isLoggedIn) {
      console.log('logged in, request to add to cart')
    } else {
      //GUEST
      console.log('Added to guest cart')
      let oldCart = JSON.parse(localStorage.getItem('cart'))
      if (!oldCart) oldCart = []
      oldCart.push(id)
      localStorage.setItem('cart', JSON.stringify(oldCart))
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    tab: state.tab,
    productInfo: state.viewProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewFullProduct(productId) {
      event.preventDefault()

      dispatch(getProductView(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
