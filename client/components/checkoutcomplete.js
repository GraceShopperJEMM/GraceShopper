import React from 'react'
import {withRouter} from 'react-router-dom'
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  Button
} from '@material-ui/core'

class CheckoutComplete extends React.Component {
  constructor() {
    super()
    this.state = {open: true}

    this.handleClose = () => {
      this.setState({open: false})
      this.props.history.push('/products')
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
          <img
            className="scrooge"
            src="https://bit.ly/2VRSI3G"
            alt="scrooge says thank you"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withRouter(CheckoutComplete)
