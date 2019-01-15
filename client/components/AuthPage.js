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

export class AuthPage extends React.Component {
  constructor() {
    super()
    this.state = {
      signingUp: false
    }
  }
  render() {
    // const {name, displayName, handleSubmit, error} = this.props
    return (
      <div style={formStyles}>
        <Card raised style={cardStyles}>
          <AccountCircle style={iconStyles} />
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
