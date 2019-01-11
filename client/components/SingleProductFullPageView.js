import React from 'react'
import {getProductView} from '../store/viewProduct'
import {connect} from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Button from '@material-ui/core/Button'

class FullPageSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.data = this.props.data
  }

  render() {
    return (
      <div id="products-container">
        <Card className="product-in-list">
          <CardMedia
            className="duck-image"
            image={this.data.productInfo.imageUrl}
          />
          <CardContent>
            <div className="inline">
              <div>
                <Typography variant="h5">
                  {this.data.productInfo.name}
                </Typography>
                <Typography variant="h6">
                  Color: {this.data.productInfo.color}
                </Typography>
                <Typography variant="h6">
                  Size: {this.data.productInfo.size}
                </Typography>
                <Typography variant="h6">
                  Stock Inventory: {this.data.productInfo.stock}
                </Typography>
              </div>
              <div align="right">
                <Typography variant="h5">
                  ${this.data.productInfo.price / 100}
                </Typography>
                <IconButton aria-label="Add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.seeAllProducts()
              }}
            >
              Return to view all products
            </Button>
          </CardContent>
        </Card>
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
