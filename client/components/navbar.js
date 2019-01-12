import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {getProductView} from '../store/viewProduct'
import {Tabs, Tab, AppBar} from '@material-ui/core'

const [PRODUCTS, HOME, CART, LOGIN] = [0, 1, 2, 3]

class Navbar extends React.Component {
  constructor() {
    super()
    this.getTab = this.getTab.bind(this)
  }

  getTab() {
    switch (this.props.location.pathname) {
      case '/products':
        return PRODUCTS
      case '/home':
        return HOME
      case '/cart':
        return CART
      case '/login':
        return LOGIN
      default:
        return 0
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{backgroundColor: '#0091d1'}}>
          <Tabs value={this.getTab()}>
            <Tab
              label="Products"
              onClick={this.props.seeAllProducts}
              component={Link}
              to="/products"
            />
            <Tab label="Profile" component={Link} to="/home" />
            <Tab label="Cart" component={Link} to="/cart" />
            <Tab label="Login" component={Link} to="/login" />
          </Tabs>
        </AppBar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    tab: state.tab
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    seeAllProducts() {
      dispatch(getProductView(0))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))
