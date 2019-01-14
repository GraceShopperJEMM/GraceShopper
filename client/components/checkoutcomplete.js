import React from 'react'
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog
} from '@material-ui/core'

class CheckoutComplete extends React.Component {
  constructor() {
    super()
    this.state = {open: true}

    this.handleClose = () => {
      this.setState({open: false})
    }

    this.handleClickOpen = () => {
      this.setState({
        open: true
      })
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
  }

  render() {
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          Thank for shopping!
        </DialogTitle>
        <DialogContent>
          <img src="https://bit.ly/2Rpk0zy" alt="scrooge says thank you" />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default CheckoutComplete
