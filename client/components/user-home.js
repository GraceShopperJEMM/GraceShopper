import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'

// Components
import AllProducts from './AllProducts'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, name} = props

  return (
    <div id="profile">
      <Typography color="primary" variant="h1">
        Welcome, {name}!
      </Typography>
      <Typography variant="h5">User Email:</Typography>
      <Typography variant="p">{email}</Typography>
      <button>Edit Email</button>
      <Typography variant="h5">Order History:</Typography>
      {/* Insert order history prop */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string
}
