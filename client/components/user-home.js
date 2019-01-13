import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import OrderHistory from './OrderHistory'
import {Typography, Button} from '@material-ui/core'
import {logout} from '../store'

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
        <Button color="secondary" variant="outlined" onClick={props.logMeOut}>
          Logout
        </Button>
      </div>
      <div className="details">
        <Typography variant="h4">Profile Details</Typography>
      </div>
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

const mapDispatch = dispatch => {
  return {
    logMeOut() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string
}
