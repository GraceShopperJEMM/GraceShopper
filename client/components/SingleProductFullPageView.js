import React from 'react'
import {getProductView} from '../store/viewProduct'
import {connect} from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import {populateGuestCart, getCartFromServer} from '../store'
import {Link} from 'react-router-dom'
import axios from 'axios'

class FullPageSingleProduct extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.fetchProductData(this.props.match.params.id)
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

  render() {
    if (!this.props.selectedProduct.id) return <h1>Loading...</h1>
    return (
      <div align="center">
        <Card>
          <CardContent>
            <Typography variant="h5">
              {this.props.selectedProduct.name}
            </Typography>
            <Typography variant="h5">
              {this.props.selectedProduct.color}
            </Typography>
            <Typography variant="h5">
              ${this.props.selectedProduct.price / 100}
            </Typography>
            <Typography variant="h6">
              Size: {this.props.selectedProduct.size}
            </Typography>
            <CardMedia
              className="duck-image"
              image={this.props.selectedProduct.imageUrl}
            />
          </CardContent>
          <IconButton
            style={{marginBottom: '1em'}}
            aria-label="Add to shopping cart"
            onClick={() => this.addToCart(this.props.selectedProduct.id)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Card>
        <Button
          style={{margin: '3em'}}
          variant="contained"
          color="primary"
          component={Link}
          to="/products"
        >
          Go to Products
        </Button>
        <Button
          style={{margin: '3em'}}
          variant="contained"
          color="primary"
          component={Link}
          to="/cart"
        >
          Go to Cart
        </Button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProductData(id) {
      dispatch(getProductView(id))
    },
    updateGuestCart() {
      dispatch(populateGuestCart())
    },
    updateUserCart(userId) {
      dispatch(getCartFromServer(userId))
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

export default connect(mapStateToProps, mapDispatch)(FullPageSingleProduct)
