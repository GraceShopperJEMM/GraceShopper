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
      checkoutComplete: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.finishedEditingQty = this.finishedEditingQty.bind(this)
    this.finishCheckout = this.finishCheckout.bind(this)
    this.checkoutButton = this.checkoutButton.bind(this)
    this.verifyCart = this.verifyCart.bind(this)
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
          <StripeBtn
            verifyCart={this.verifyCart}
            total={this.props.cart.productOrders
              .reduce((total, order) => {
                console.log(order)
                return total + order.product.price * order.quantity
              }, 0)
              .toFixed(2)}
            checkoutButton={this.checkoutButton}
          />
        </div>
        {this.state.checkoutComplete ? <CheckoutComplete /> : null}
      </div>
    )
  }

  async finishedEditingQty(id, evt) {
    let qty = Number(evt.target.value)
    if (qty < 1) {
      //Fix bad qty's
      evt.target.value = 1
      qty = 1
    }
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

  // Check valid quantities
  //true if good, false if bad
  verifyCart() {
    const cart = this.props.cart.productOrders
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].quantity < 1) {
        return false
      }
    }
    return true
  }

  checkoutButton(info) {
    const data = JSON.parse(info.config.data)
    console.log('data', data)
    const address =
      data.token.card.address_line1 +
      ' ' +
      data.token.card.address_city +
      ' ' +
      data.token.card.address_state +
      ' ' +
      data.token.card.address_zip +
      ' ' +
      data.token.card.address_country
    const email = data.token.email
    // LOGGED IN USER
    if (this.props.user && this.props.user.id) {
      this.props.checkout(this.props.user.id, {address, email})
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

      axios
        .put('/api/guests/placeOrder', {cart: gCart, address, email})
        .then(() => localStorage.setItem('cart', JSON.stringify([])))
        .then(() => this.props.setGuestCart())
        .catch(err => {
          console.log(err)
        })
      this.props.setGuestCart([])
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
    checkout(userId, info) {
      dispatch(checkoutOnServer(userId, info))
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
