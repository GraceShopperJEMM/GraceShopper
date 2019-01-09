import React from 'react'
import axios from 'axios'
import OrderHistory from './OrderHistory'

//Components
import {SingleProduct} from './SingleProduct'

export default class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
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
              name={product.name}
              price={product.price}
              color={product.color}
              size={product.size}
              imageUrl={product.imageUrl}
            />
          )
        })}
        <OrderHistory />
      </div>
    )
  }
}
