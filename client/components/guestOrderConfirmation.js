import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {checkoutOnServer, populateGuestCart} from '../store/cartState'
import {withRouter} from 'react-router-dom'
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  Button
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const OrderProduct = function(props) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <img
              src={props.product.imageUrl}
              title="Product Picture"
              className="checkout"
            />
            {props.product.size} {props.product.color} {props.product.name}
          </Typography>
          <Typography component="p">${props.product.price / 100}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

class OrderConfirm extends React.Component {
  constructor(props) {
    super(props)
    console.log('see cart data', this.props.cart.productOrders)
    this.state = {
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      name: '',
      cart: this.props.cart.productOrders.map(product => {
        return product.id
      })
    }

    this.handleChange = this.handleChange.bind(this)
    this.guestCheckout = this.guestCheckout.bind(this)
  }

  handleChange(e) {
    let change = {}
    change[e.target.id] = e.target.value
    this.setState(change)
  }
  guestCheckout() {
    let cart = this.state.cart

    let email = this.state.email
    let address = this.state.address
    let city = this.state.city
    let state = this.state.state
    let zip = this.state.zip
    let name = this.state.name

    axios
      .put('/api/guests/placeOrder', {
        cart,
        email,
        address,
        city,
        state,
        zip,
        name
      })
      .then(() => localStorage.setItem('cart', JSON.stringify([])))
      .then(() => this.props.setGuestCart())
      .then(() => {
        this.props.onClose()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Dialog fullScreen onClose={this.props.onClose} open={this.props.open}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <div className="confirmFlex">
          <div>
            <DialogContent className="TextField">
              <DialogContentText>
                Please fill in all of the following fields:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                type="address"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                autoFocus
                margin="dense"
                id="city"
                label="City"
                type="city"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                autoFocus
                margin="dense"
                id="state"
                label="State"
                type="state"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                autoFocus
                margin="dense"
                id="zip"
                label="Zip Code"
                type="zip"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                onChange={this.handleChange}
              />
              <DialogActions className="buttonpos">
                <Button onClick={this.props.onClose}>Cancel</Button>
                <Button onClick={this.guestCheckout}>Approve</Button>
              </DialogActions>
            </DialogContent>
          </div>
          <div>
            {this.props.cart.productOrders.map((products, dex) => {
              return <OrderProduct product={products.product} key={dex} />
            })}
          </div>
        </div>
      </Dialog>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    setGuestCart(cart) {
      dispatch(populateGuestCart(cart))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(OrderConfirm))
