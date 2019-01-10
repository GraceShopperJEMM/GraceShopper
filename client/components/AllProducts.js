import React from 'react'
import axios from 'axios'
import {getProductView} from '../store/viewProduct'
import {connect} from 'react-redux'

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
  }

  async componentDidMount() {
    const products = (await axios.get('/api/products')).data
    console.log(products)
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
              name={product.name}
              price={product.price}
              color={product.color}
              size={product.size}
              imageUrl={product.imageUrl}
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
}

const mapStateToProps = state => {
  return {
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
