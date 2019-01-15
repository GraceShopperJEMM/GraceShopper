import React from 'react'
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  TextField,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import axios from 'axios'

export default class NewProdDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      size: 'Small',
      color: '',
      url: ''
    }
  }
  render() {
    return (
      <Dialog fullWidth open={this.props.open}>
        <DialogTitle>Add a New Product</DialogTitle>
        <DialogContent>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogContentText>Name</DialogContentText>
            <TextField
              placeholder="ex: Regular Duck"
              onChange={evt =>
                this.setState({
                  name: evt.target.value
                })
              }
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogContentText>Price</DialogContentText>
            <TextField
              placeholder="ex: 20 or 19.99"
              type="number"
              onChange={evt =>
                this.setState({
                  price: evt.target.value
                })
              }
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogContentText>Size</DialogContentText>
            <Select
              value={this.state.size}
              onChange={evt =>
                this.setState({
                  size: evt.target.value
                })
              }
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
            </Select>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogContentText>Color</DialogContentText>
            <TextField
              placeholder="ex: Blue"
              onChange={evt =>
                this.setState({
                  color: evt.target.value
                })
              }
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogContentText>Image URL</DialogContentText>
            <TextField
              placeholder="ex: www.google.com"
              onChange={evt =>
                this.setState({
                  url: evt.target.value
                })
              }
            />
          </div>
          <DialogActions>
            <Button onClick={this.props.closeDialog}>Cancel</Button>
            <Button
              onClick={() => {
                axios.post('/api/products', this.state)
                this.props.closeDialog()
              }}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}
