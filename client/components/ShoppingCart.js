import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  IconButton
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'

class ShoppingCart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: [
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
          quantity: 2,
          stock: 1
        }
      ]
    }
  }

  componentDidMount() {
    const cart = this.props.user.cart
    console.log('user', this.props.user)
    console.log('cart', cart)
  }

  render() {
    return (
      <div align="center" id="shopping-cart-container">
        {this.state.cart.map(item => (
          <Card className="item-in-cart" key={item.id}>
            <CardMedia className="cart-duck-image" image={item.imageUrl} />
            <CardContent className="cart-item-content">
              <div align="left">
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">${item.price}</Typography>
                {item.quantity > item.stock && (
                  <Typography variant="h6">OUT OF STOCK</Typography>
                )}
              </div>
              <div className="right-align" align="right">
                {/* <InputLabel>Qty</InputLabel> */}
                <IconButton aria-label="Delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <TextField
                  style={{width: '2em', padding: '1em'}}
                  type="number"
                  textAlign="center"
                  defaultValue={item.quantity}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(ShoppingCart)
