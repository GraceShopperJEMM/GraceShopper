import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {logout, changeTab} from '../store'
import {getProductView} from '../store/viewProduct'
import {Tabs, Tab, AppBar} from '@material-ui/core'

class Navbar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <AppBar position="static" style={{backgroundColor: '#0091d1'}}>
          <Tabs value={this.props.tab} onChange={this.props.handleChange}>
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
        {/* {this.props.tab === 0 && <Redirect to="/products" />}
        {this.props.tab === 1 && <Redirect to="/home" />}
        {this.props.tab === 2 && <Redirect to="/cart" />}
        {this.props.tab === 3 && <Redirect to="/login" />} */}
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
    handleChange(evt, value) {
      dispatch(changeTab(value))
    },
    loadCurrentTab(tabValue) {
      // console.log('tabValue:', tabValue)
      dispatch(changeTab(tabValue))
    },
    seeAllProducts() {
      dispatch(getProductView(0))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
