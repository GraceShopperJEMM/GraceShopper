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
          <Typography component="p">
            ${props.product.price / 100} X {props.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

class OrderConfirm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      address: ''
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
    let cart = this.props.cart.productOrders.map(product => {
      return {id: product.product.id, quantity: product.quantity}
    })
    let email = this.state.email
    let address = this.state.address

    axios
      .put('/api/guests/placeOrder', {
        cart,
        email,
        address
      })
      .then(() => localStorage.setItem('cart', JSON.stringify([])))
      .then(() => this.props.setGuestCart())
      .then(() => {
        this.props.onClose()
        this.props.complete()
      })

      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Dialog
        onClose={() => {
          this.props.onClose()
        }}
        open={this.props.open}
      >
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
                id="address"
                label="Address"
                type="address"
                onChange={this.handleChange}
              />
              <br />

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
              return (
                <OrderProduct
                  product={products.product}
                  key={dex}
                  quantity={products.quantity}
                />
              )
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
