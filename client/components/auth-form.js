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

// Styles
const cardStyles = {
  width: '30vw',
  padding: '2%',
  marginTop: '3vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const submitStyles = {
  marginTop: '1.5em',
  padding: '0.5em',
  backgroundColor: '#0091d1',
  borderRadius: '5px',
  width: '90%',
  color: 'white'
}

const iconStyles = {
  fontSize: '150px',
  color: '#0091d1'
}

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  console.log('name:', name)
  return (
    <div style={formStyles}>
      {/* <Card raised style={cardStyles}>
        <AccountCircle style={iconStyles} />
        <Typography component="h1" variant="h4">
          {props.displayName}
        </Typography> */}

      <form style={formStyles} name={name} onSubmit={handleSubmit}>
        {name === 'signup' ? (
          <FormControl margin="normal" required>
            <InputLabel htmlFor="username">Name</InputLabel>
            <Input id="username" name="username" autoFocus />
          </FormControl>
        ) : null}
        <FormControl margin="normal" required>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" name="email" />
        </FormControl>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" name="password" />
        </FormControl>
        <Button type="submit" style={submitStyles}>
          {displayName}
        </Button>
      </form>
      {/* </Card> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const username = evt.target.username ? evt.target.username.value : ''
      console.log('formName:', formName)
      dispatch(auth(username, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
