import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
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

import {withRouter, Link} from 'react-router-dom'
import CheckoutComplete from './checkoutcomplete'

import ShoppingCartDeleteDialog from './ShoppingCartDeleteDialog'
import OrderConfirm from './guestOrderConfirmation'
import StripeBtn from './StripeBtn'

class ShoppingCart extends React.Component {
  componentDidUpdate() {
    console.log('ShoppingCart Updated. Cart:', this.props.cart)
  }

  constructor() {
    super()
    this.state = {
      dialogOpen: false,
      idToDelete: 0,
      edittingQty: false,
      guestCheckoutDialogOpen: false,
      checkoutComplete: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.finishedEditingQty = this.finishedEditingQty.bind(this)
    this.handleGuestCheckoutCancel = this.handleGuestCheckoutCancel.bind(this)
    this.finishCheckout = this.finishCheckout.bind(this)
    this.checkoutButton = this.checkoutButton.bind(this)
  }
  finishCheckout() {
    this.setState({checkoutComplete: true})
  }
  handleClose() {
    this.setState({
      dialogOpen: false,
      idToDelete: 0
    })
  }
  handleGuestCheckoutCancel() {
    this.setState({
      guestCheckoutDialogOpen: false
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
        {/* insert function to run on guest order checkout */}
        <OrderConfirm
          onClose={this.handleGuestCheckoutCancel}
          open={this.state.guestCheckoutDialogOpen}
          complete={this.finishCheckout}
        />
        {this.props.cart.productOrders.map(item => (
          <Card className="item-in-cart" key={item.product.id}>
            <CardMedia
              component={Link}
              to={`/products/${item.product.id}`}
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
                onChange={() =>
                  this.setState({
                    edittingQty: true
                  })
                }
                onBlur={evt => this.finishedEditingQty(item.product.id, evt)}
                label="Qty"
                variant="standard"
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
        <div className="stripe">
          <header className="App-header">
            <p>Stripe Checkout - ReactJS</p>
            <StripeBtn checkoutButton={this.checkoutButton} />
          </header>
        </div>
        {this.state.checkoutComplete ? <CheckoutComplete /> : null}
      </div>
    )
  }

  async finishedEditingQty(id, evt) {
    const qty = Number(evt.target.value)
    // LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      await axios.put(
        `/api/users/${
          this.props.user.id
        }/cart/updateQty?productID=${id}&quantity=${qty}`
      )
      this.props.getUserCart(this.props.user.id)
    } else {
      // GUEST
      let cart = JSON.parse(localStorage.getItem('cart'))
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
          cart[i].quantity = qty
          break
        }
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      this.props.setGuestCart()
    }
    this.setState({
      edittingQty: false
    })
  }

  async removeFromCart(id) {
    // LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      await axios.delete(
        `/api/users/${this.props.user.id}/cart/delete?productID=${id}`
      )
      this.props.getUserCart(this.props.user.id)
    } else {
      // GUEST
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart = cart.filter(item => {
        if (item.id !== id) return item
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      this.props.setGuestCart()
    }
    this.setState({
      dialogOpen: false,
      idToDelete: 0
    })
  }

  checkoutButton() {
    // Check valid quantities
    const cart = this.props.cart.productOrders
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].quantity < 1) {
        alert('Please make sure all quantities are at least 1!')
        return
      }
    }
    // LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      this.props.checkout(this.props.user.id)
    } else {
      // GUEST
      let gCart = JSON.parse(localStorage.getItem('cart'))
      console.log('Current cart', gCart)
      if (gCart.length === 0) {
        return
      }
      this.setState({
        guestCheckoutDialogOpen: true
      })

      // transferred code to guestOrderConfirmation
      // axios
      //   .put('/api/guests/placeOrder', {cart})
      //   .then(() => localStorage.setItem('cart', JSON.stringify([])))
      //   .then(() => this.props.setGuestCart())
      //   .catch(err => {
      //     console.log(err)
      //   })
      // this.props.setGuestCart([])
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
