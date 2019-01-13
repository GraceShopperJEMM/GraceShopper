import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import OrderHistory from './OrderHistory'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'
import Button from '@material-ui/core/Button'

// Components
import AllProducts from './AllProducts'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, name} = props

  return (
    <div id="profile">
      <Typography color="primary" variant="h2">
        Welcome {name} to Duck Sales!
      </Typography>
      <div className="details">
        <Typography variant="h4">Profile Details</Typography>
      </div>
      <div align="center" id="profile-info">
        <div className="details">
          <Typography variant="h6">Name:</Typography>
          <Typography variant="subtitle1">{name}</Typography>
          <Button variant="outlined" color="secondary">
            Edit Name
          </Button>
        </div>
        <div className="details">
          <Typography variant="h6">User Email:</Typography>
          <Typography variant="subtitle1">{email}</Typography>
          <Button variant="outlined" color="secondary">
            Edit Email
          </Button>
        </div>
      </div>
      <OrderHistory />
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
