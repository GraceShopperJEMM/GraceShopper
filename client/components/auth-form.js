import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import CssBaseline from '@material-ui/core/CssBaseline'
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
  marginTop: '5px',
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

  return (
    <div style={formStyles}>
      <Card raised style={cardStyles}>
        <AccountCircle style={iconStyles} />
        <Typography component="h1" variant="h4">
          Log In
        </Typography>
        <form style={formStyles}>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" />
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password" />
          </FormControl>
          <Button style={submitStyles}>Submit</Button>
        </form>
      </Card>
    </div>

    // <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //     <div>
    //       <label htmlFor="email">
    //         <small>Email</small>
    //       </label>
    //       <input name="email" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    //   <a href="/auth/google">{displayName} with Google</a>
    // </div>
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
      dispatch(auth(email, password, formName))
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
