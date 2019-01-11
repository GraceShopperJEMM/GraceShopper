import React from 'react'
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
import {getCartFromServer} from '../store/cartState'

class ShoppingCart extends React.Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0,
      cart: [
        {
          name: 'punk duck',
          price: 19.99,
          size: 'Small',
          color: 'red',
          imageUrl:
            'http://www.duckshop.com/shop_cfg/rubberducks/badeente5434-001.JPG',
          quantity: 2,
          stock: 89
        },
        {
          name: 'punk duck',
          price: 19.99,
          size: 'Small',
          color: 'red',
          imageUrl:
            'http://www.duckshop.com/shop_cfg/rubberducks/badeente5434-001.JPG',
          quantity: 2,
          stock: 4
        },
        {
          name: 'punk duck',
          price: 19.99,
          size: 'Small',
          color: 'red',
          imageUrl:
            'http://www.duckshop.com/shop_cfg/rubberducks/badeente5434-001.JPG',
          quantity: 7,
          stock: 1
        },
        {
          name: 'punk duck',
          price: 19.99,
          size: 'Small',
          color: 'red',
          imageUrl:
            'http://www.duckshop.com/shop_cfg/rubberducks/badeente5434-001.JPG',
          quantity: 1,
          stock: 4
        },
        {
          name: 'punk duck',
          price: 19.99,
          size: 'Small',
          color: 'red',
          imageUrl:
            'http://www.duckshop.com/shop_cfg/rubberducks/badeente5434-001.JPG',
          quantity: 2,
          stock: 1
        }
      ]
    }
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id)
  }

  render() {
    return (
      <div align="center" id="shopping-cart-container">
        {this.state.cart.map(item => (
          <Card className="item-in-cart" key={item.id}>
            <CardMedia className="cart-duck-image" image={item.imageUrl} />
            <CardContent className="cart-item-content">
              <div style={{flex: 1}} align="left">
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">${item.price}</Typography>
                {item.quantity > item.stock && (
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
          <Typography variant="h5">Total: ${this.state.totalPrice}</Typography>
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </div>
      </div>
    )
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
    }
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
