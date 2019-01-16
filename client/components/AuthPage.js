import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Card,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Button
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import {Login, Signup} from './auth-form'
import {getUser} from '../store'

// Styles
const cardStyles = {
  width: '30vw',
  padding: '2%',
  marginTop: '3vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const toggleStyles = {
  marginTop: '1.5em',
  padding: '0.5em',
  backgroundColor: '#c900a9',
  borderRadius: '5px',
  width: '90%',
  color: 'white'
}

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const iconStyles = {
  fontSize: '150px',
  color: '#0091d1'
}

/**
 * COMPONENT
 */

class AuthPageComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      signingUp: false
    }
  }

  componentWillUnmount() {
    if (this.props.user.error) this.props.clearError()
  }

  render() {
    // const {name, displayName, handleSubmit, error} = this.props
    return (
      <div style={formStyles}>
        <Card raised style={cardStyles}>
          <AccountCircle style={iconStyles} />
          {this.props.user.error ? (
            <h2 className="login-error">
              {this.props.user.error.response.data}
            </h2>
          ) : null}
          <Typography component="h1" variant="h4">
            {this.state.signingUp ? 'Create New Account' : 'Log In'}
          </Typography>
          {this.state.signingUp ? <Signup /> : <Login />}
          <Button
            type="submit"
            style={toggleStyles}
            onClick={() =>
              this.setState(prev => ({signingUp: !prev.signingUp}))
            }
          >
            {this.state.signingUp
              ? 'Return To Sign In Page'
              : 'Go To Create New Account Page'}
          </Button>
        </Card>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    clearError() {
      dispatch(getUser({}))
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export const AuthPage = connect(mapState, mapDispatch)(AuthPageComponent)
