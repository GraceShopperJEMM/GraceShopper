import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logout, changeTab} from '../store'
import {Tabs, Tab, AppBar} from '@material-ui/core'
import AllProducts from './AllProducts'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static" style={{backgroundColor: '#0091d1'}}>
          <Tabs value={this.props.tab} onChange={this.props.handleChange}>
            <Tab label="Products" />
            <Tab label="Profile" />
            <Tab label="Cart" />
            <Tab label="Login" />
          </Tabs>
        </AppBar>
        {this.props.tab === 0 && <Redirect to="/products" />}
        {this.props.tab === 1 && <Redirect to="/home" />}
        {this.props.tab === 2 && <Redirect to="/login" />}
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
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
