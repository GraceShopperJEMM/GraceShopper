import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {
  populateGuestCart,
  getCartFromServer,
  getAllProductsFromServer
} from '../store'

import {Button} from '@material-ui/core'

// Components
import {SingleProduct} from './SingleProduct'
import NewProdDialog from './NewProdDialog'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
    this.openDialogIfAdmin = this.openDialogIfAdmin.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.state = {
      addNewProdDlg: false
    }
  }

  render() {
    return (
      <div>
        <NewProdDialog
          closeDialog={this.closeDialog}
          open={this.state.addNewProdDlg}
        />
        <div id="products-container">
          {this.props.products.map(product => {
            return (
              <SingleProduct
                key={product.id}
                name={product.name}
                price={product.price}
                color={product.color}
                size={product.size}
                imageUrl={product.imageUrl}
                id={product.id}
                addToCart={this.addToCart}
              />
            )
          })}
        </div>
        {this.props.user &&
          this.props.user.isAdmin && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Button onClick={this.openDialogIfAdmin}>Add New Product</Button>
            </div>
          )}
      </div>
    )
  }

  closeDialog() {
    this.setState({
      addNewProdDlg: false
    })
    this.props.getAllProductsFromServer()
  }

  openDialogIfAdmin() {
    if (this.props.user && this.props.user.isAdmin) {
      this.setState({
        addNewProdDlg: true
      })
    }
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
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGuestCart() {
      dispatch(populateGuestCart())
    },
    updateUserCart(userId) {
      dispatch(getCartFromServer(userId))
    },
    getAllProductsFromServer() {
      dispatch(getAllProductsFromServer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
