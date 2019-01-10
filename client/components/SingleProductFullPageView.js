import React from 'react'
import {getProductView} from '../store/viewProduct'
import {connect} from 'react-redux'

class FullPageSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.data = this.props.data
  }

  render() {
    return (
      <div>
        <h3>Product Name: {this.data.productInfo.name}</h3>
        <h3>Product Color: {this.data.productInfo.color}</h3>
        <h3>Product Price: {this.data.productInfo.price}</h3>
        <h3>Product Size: {this.data.productInfo.size}</h3>
        <h3>Current Stock Inventory: {this.data.productInfo.stock}</h3>
        <h3>
          <img src={this.data.productInfo.imageUrl} />
        </h3>
        <h2
          onClick={() => {
            this.props.seeAllProducts()
          }}
        >
          Return to view all products
        </h2>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    seeAllProducts() {
      dispatch(getProductView(0))
    }
  }
}

export default connect(null, mapDispatch)(FullPageSingleProduct)
