import React from 'react'
import axios from 'axios'
import {getProductView} from '../store/viewProduct'
import {connect} from 'react-redux'
import {getAllProductsFromServer} from '../store/allProducts'
import FullPageSingleProduct from './SingleProductFullPageView'
import store from '../store/index'

//Components
import {SingleProduct} from './SingleProduct'

class AllProducts extends React.Component {
  render() {
    return this.props.productInfo === 0 ? (
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
              selectProd={this.props.viewFullProduct}
              addToCart={this.addToCart}
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
    if (this.props.user && this.props.user.id) {
      axios.post(
        `/api/users/${this.props.user.id}/addToCart`,
        `productId=${id}`
      )
    } else {
      //GUEST
      let oldCart = JSON.parse(localStorage.getItem('cart'))
      if (!oldCart) oldCart = []
      oldCart.push(id)
      localStorage.setItem('cart', JSON.stringify(oldCart))
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
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
