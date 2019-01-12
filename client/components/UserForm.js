import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'
import Button from '@material-ui/core/Button'

const UserForm = props => {
  return (
    <div>
      <h3>Update Profile</h3>
      <form style={formStyles} name="login" onSubmit={props.handleSubmit}>
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
        <Button type="submit" style={submitStyles}>
          Submit
        </Button>

        <div>
          <Button
            type="submit"
            className="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
