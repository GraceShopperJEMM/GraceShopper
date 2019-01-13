import React from 'react'
import {
  Card,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Button
} from '@material-ui/core'

// Styles
const formStyles = {
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const UserForm = props => {
  return (
    <div>
      <form style={formStyles} onSubmit={props.handleSubmit}>
        <Typography variant="h5">Update Profile</Typography>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            autoFocus
            onChange={props.handleChange}
            value={props.name}
          />
        </FormControl>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            onChange={props.handleChange}
            value={props.email}
          />
        </FormControl>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
