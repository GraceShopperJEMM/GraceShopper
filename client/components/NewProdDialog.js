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
      id: 0,
      name: '',
      price: '',
      size: 'Small',
      color: '',
      url: '',
      updating: false
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.props.id)
      this.setState({
        id: this.props.id,
        name: this.props.name,
        price: this.props.price,
        size: this.props.size,
        color: this.props.color,
        url: this.props.url,
        updating: this.props.updating
      })
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
              value={this.state.name}
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
              value={this.state.price}
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
              value={this.state.color}
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
              value={this.state.url}
            />
          </div>
          <DialogActions>
            <Button onClick={this.props.closeDialog}>Cancel</Button>
            <Button
              onClick={() => {
                if (Number(this.state.price) <= 0) {
                  alert('Please enter a valid price!')
                } else {
                  if (this.state.updating) {
                    axios.put(`/api/products/${this.props.id}`, this.state)
                  } else {
                    axios.post('/api/products', this.state)
                  }
                  this.props.closeDialog()
                }
              }}
            >
              {this.state.updating ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}
