import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logout, changeTab} from '../store'
import {getProductView} from '../store/viewProduct'
import {Tabs, Tab, AppBar} from '@material-ui/core'
import AllProducts from './AllProducts'

class Navbar extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     value: 0
  //   }
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // handleChange(evt, value) {
  //   this.setState({
  //     value
  //   })
  // }

  // multiProductView() {
  //   console.log('Insert thunk dispatch here')
  //   this.props.seeAllProducts()
  // }

  render() {
    return (
      <div>
        <AppBar position="static" style={{backgroundColor: '#0091d1'}}>
          <Tabs value={this.props.tab} onChange={this.props.handleChange}>
            <Tab label="Products" onClick={this.props.seeAllProducts} />
            <Tab label="Profile" />
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
    },
    seeAllProducts() {
      dispatch(getProductView(0))
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
