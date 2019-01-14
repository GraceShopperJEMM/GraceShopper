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
import {
  checkoutOnServer,
  getCartFromServer,
  populateGuestCart
} from '../store/cartState'
import {me} from '../store'
import {withRouter} from 'react-router-dom'

import ShoppingCartDeleteDialog from './ShoppingCartDeleteDialog'

class ShoppingCart extends React.Component {
  componentDidUpdate() {
    console.log('ShoppingCart Updated. Cart:', this.props.cart)
  }

  constructor() {
    super()
    this.state = {
      dialogOpen: false,
      idToDelete: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }
  handleClose() {
    this.setState({
      dialogOpen: false,
      idToDelete: 0
    })
  }
  render() {
    return (
      <div align="center" id="shopping-cart-container">
        <ShoppingCartDeleteDialog
          delete={() => this.removeFromCart(this.state.idToDelete)}
          onClose={this.handleClose}
          open={this.state.dialogOpen}
        />
        {this.props.cart.productOrders.map(item => (
          <Card className="item-in-cart" key={item.product.id}>
            <CardMedia
              className="cart-duck-image"
              image={item.product.imageUrl}
            />
            <CardContent className="cart-item-content">
              <div style={{flex: 1}} align="left">
                <Typography
                  variant="p"
                  style={{fontWeight: 'bold', marginBottom: '.5rem'}}
                >
                  {item.product.name}
                </Typography>
                <Typography variant="p">{`$${(item.product.price / 100).toFixed(
                  2
                )}`}</Typography>
              </div>
              <TextField
                label="Qty"
                variant="outlined"
                style={{width: '5em'}}
                type="number"
                defaultValue={item.quantity}
              />
              <div
                style={{textAlign: 'center'}}
                className="right-align"
                align="right"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconButton
                    aria-label="Delete"
                    onClick={() =>
                      this.setState({
                        dialogOpen: true,
                        idToDelete: item.product.id
                      })
                    }
                  >
                    <DeleteIcon
                      style={{width: '20px', height: '20px'}}
                      fontSize="small"
                    />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div
          style={{
            width: '200px',
            marginTop: '1em'
          }}
          id="checkout-cart"
        >
          <Typography variant="h5">
            Total: $
            {(
              this.props.cart.productOrders.reduce((total, order) => {
                console.log(order)
                return total + order.product.price * order.quantity
              }, 0) / 100
            ).toFixed(2)}
          </Typography>
          <Button
            id="checkoutBtn"
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

  async removeFromCart(id) {
    //LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      await axios.delete(
        `/api/users/${this.props.user.id}/cart/delete?productID=${id}`
      )
      this.props.getUserCart(this.props.user.id)
    } else {
      //GUEST
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart = cart.filter(item => {
        if (item.id !== id) return item
      })
      console.log('here', cart)
      localStorage.setItem('cart', JSON.stringify(cart))
      this.props.setGuestCart()
    }
    this.setState({
      dialogOpen: false,
      idToDelete: 0
    })
  }

  checkoutButton() {
    // LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      this.props.checkout(this.props.user.id)
    } else {
      // GUEST
      let cart = JSON.parse(localStorage.getItem('cart'))
      console.log('Current cart', cart)
      if (!cart) cart = []
      axios
        .put('/api/guests/placeOrder', {cart})
        .then(() => localStorage.setItem('cart', JSON.stringify([])))
        .then(() => this.props.setGuestCart())
        .catch(err => {
          console.log(err)
        })
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
    checkout(userId) {
      dispatch(checkoutOnServer(userId))
    },
    getUserCart(userId) {
      dispatch(getCartFromServer(userId))
    },
    setGuestCart() {
      dispatch(populateGuestCart())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ShoppingCart))
