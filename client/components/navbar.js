import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, changeTab} from '../store'
import {getProductView} from '../store/viewProduct'
import {Tabs, Tab, AppBar} from '@material-ui/core'

class Navbar extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   tabValue: 0
    // }
    this.getTab = this.getTab.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  getTab() {
    switch (this.props.location.pathname) {
      case '/products':
        return 0
      case '/home':
        return 1
      case '/cart':
        return 2
      case '/login':
        return 3
      default:
        return 0
    }
  }

  // componentDidUpdate() {
  //   this.setState({
  //     tabValue: this.getTab()
  //   })
  // }

  // componentDidMount() {
  //   this.setState({
  //     tabValue: this.getTab()
  //   })
  // }

  render() {
    return (
      <div>
        <AppBar position="static" style={{backgroundColor: '#0091d1'}}>
          <Tabs value={this.getTab()} /*onChange={this.handleChange}*/>
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

export default withRouter(connect(mapState, mapDispatch)(Navbar))
