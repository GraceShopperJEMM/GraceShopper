import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AuthPage} from './components'
import {me, getAllProductsFromServer} from './store'
import AllProducts from './components/AllProducts'
import ShoppingCart from './components/ShoppingCart'
import FullProductView from './components/SingleProductFullPageView'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('Routes Mounted')
    this.props.loadInitialData()
  }

  componentDidUpdate() {
    console.log('Routes Updated. Cart:', this.props.cart)
    console.log('User:', this.props.user.id)
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* To prevent login page from being loaded directly from url while logged in */}
        <Route
          path="/login"
          render={rtProps =>
            this.props.isLoggedIn ? (
              <Redirect to="/home" />
            ) : (
              <AuthPage {...rtProps} />
            )
          }
        />
        {/* <Route path="/signup" component={Signup} /> */}
        <Route path="/products/:id" component={FullProductView} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart" component={ShoppingCart} />
        <Route
          path="/home"
          render={() => (isLoggedIn ? <UserHome /> : <Login />)}
        />
        <Route render={() => <Redirect to="/products" />} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getAllProductsFromServer())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
