import React from 'react'
import {DialogTitle, DialogActions, Dialog, Button} from '@material-ui/core'

export default class ShoppingCartDeleteDialog extends React.Component {
  render() {
    return (
      <Dialog onClose={this.props.onClose} open={this.props.open}>
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.props.delete}>Delete</Button>
        </DialogActions>
      </Dialog>
    )
  }
}
