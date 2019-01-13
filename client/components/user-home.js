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
import AllProducts from './AllProducts'
import UserForm from './UserForm'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      // name: '',
      // email: '',
      viewForm: false
    }
    this.showEditForm = this.showEditForm.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // static getDerivedStateFromProps (props, state) {
  //   return {
  //     name: props.name,
  //     email: props.email
  //   }
  // }

  // handleChange (evt) {
  //   // this state change targets any input field
  //   this.setState({
  //     [evt.target.name]: evt.target.value
  //   })
  // }

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
    const {email, name} = this.props

    return (
      <div id="profile">
        <Typography color="primary" variant="h2">
          Welcome {name} to Duck Sales!
        </Typography>
        <div className="details">
          <Typography variant="h4">Your Profile</Typography>
        </div>
        <div className="details">
          <Typography variant="h6">Name:</Typography>
          <Typography variant="p">{name}</Typography>
        </div>
        <div className="details">
          <Typography variant="h6">User Email:</Typography>
          <Typography variant="p">{email}</Typography>
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
          {this.state.viewForm ? (
            <UserForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              name={this.state.name}
              email={this.state.email}
            />
          ) : (
            ''
          )}
        </div>
        <div className="details">
          <Typography variant="h6">Order History:</Typography>
          {/* Insert order history prop */}
        </div>
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

// const mapDispatch = dispatch => {
//   return {
//     modifyUser: (user, id) => dispatch(modifyUser(user, id))
//   }
// }

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string
}
