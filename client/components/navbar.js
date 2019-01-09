import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Tabs, Tab, AppBar} from '@material-ui/core'
import AllProducts from './AllProducts'
import {Redirect} from 'react-router-dom'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt, value) {
    this.setState({
      value
    })
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Products" />
            <Tab label="Profile" />
            <Tab label="Cart" />
            <Tab label="Login" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <Redirect to="/products" />}
        {this.state.value === 1 && <Redirect to="/home" />}
        {this.state.value === 2 && <Redirect to="/cart" />}
        {this.state.value === 3 && <Redirect to="/login" />}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
// <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
