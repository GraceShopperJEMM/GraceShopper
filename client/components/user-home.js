import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {modifyUser} from '../store/user'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button
} from '@material-ui/core'

// Components
import UserForm from './UserForm'
// import {Redirect} from 'react-router-dom'
import OrderHistory from './OrderHistory'
import {logout} from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      viewForm: false
    }
    this.showEditForm = this.showEditForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // toggle edit form state
  showEditForm(evt) {
    evt.preventDefault()
    this.setState(prevState => ({
      viewForm: !prevState.viewForm
    }))
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // this.props.modifyUser(this.state, this.props.match.params.id)
  }

  render(props) {
    const {email, name, logMeOut} = this.props

    return (
      <div id="profile">
        <Typography color="primary" variant="h2">
          Welcome {name} to Duck Sales!
        </Typography>
        <div className="details">
          <Typography variant="h4">Your Profile</Typography>
        </div>
        <div align="center" id="profile-info">
          <div className="details">
            <Typography variant="h6">Name:</Typography>
            <Typography variant="p">{name}</Typography>
          </div>
          <div className="details">
            <Typography variant="h6">User Email:</Typography>
            <Typography variant="p">{email}</Typography>
          </div>
          <div className="details">
            <Button color="secondary" variant="contained" onClick={logMeOut}>
              Logout
            </Button>
          </div>
        </div>

        {!this.state.viewForm ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.showEditForm}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            variant="contained"
            color="default"
            onClick={this.showEditForm}
          >
            Cancel Edit
          </Button>
        )}
        <div id="form">
          {this.state.viewForm ? (
            <Card>
              <UserForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                name={this.state.name}
                email={this.state.email}
              />
            </Card>
          ) : (
            ''
          )}
        </div>
        <OrderHistory />
      </div>
    )
  }
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
