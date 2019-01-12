import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  IconButton,
  Button
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {getCartFromServer} from '../store/cartState'
import {me} from '../store'

class ShoppingCart extends React.Component {
  render() {
    if (!this.props.cart.productOrders) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div align="center" id="shopping-cart-container">
          {this.props.cart.productOrders.map(item => (
            <Card className="item-in-cart" key={item.product.id}>
              <CardMedia
                className="cart-duck-image"
                image={item.product.imageUrl}
              />
              <CardContent className="cart-item-content">
                <div style={{flex: 1}} align="left">
                  <Typography variant="h5">{item.product.name}</Typography>
                  <Typography variant="h6">${item.product.price}</Typography>
                  {item.quantity > item.product.stock && (
                    <Typography variant="h6">OUT OF STOCK</Typography>
                  )}
                </div>
                <div
                  style={{textAlign: 'center'}}
                  className="right-align"
                  align="right"
                >
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton aria-label="Delete">
                      <DeleteIcon
                        style={{width: '20px', height: '20px'}}
                        fontSize="small"
                      />
                    </IconButton>
                  </div>
                  <TextField
                    label="Qty"
                    variant="outlined"
                    style={{width: '6em'}}
                    type="number"
                    defaultValue={item.quantity}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <div id="checkout-cart">
            <Typography variant="h5">
              Total: ${this.props.cart.productOrders.reduce((total, order) => {
                return total + order.product.price * order.quantity
              }, 0)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.checkoutButton()}
            >
              Checkout
            </Button>
          </div>
        </div>
      )
    }
  }

  checkoutButton() {
    //LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      axios.put(`/api/users/${this.props.user.id}/placeOrder`)
    } else {
      //GUEST
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (!cart) cart = []
      axios.put('/api/guests/placeOrder', {cart})
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart(userId) {
      dispatch(getCartFromServer(userId))
    },
    getMe() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
