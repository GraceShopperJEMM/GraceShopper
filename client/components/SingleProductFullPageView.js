import React from 'react'
import {getProductView} from '../store/viewProduct'
import {connect} from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core'

class FullPageSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.data = this.props.data
  }

  render() {
    return (
      <div align="center">
        <Card>
          <CardContent>
            <Typography variant="h5">{this.data.productInfo.name}</Typography>
            <Typography variant="h5">{this.data.productInfo.color}</Typography>
            <Typography variant="h5">${this.data.productInfo.price}</Typography>
            <Typography variant="h6">
              Size: {this.data.productInfo.size}
            </Typography>
            <CardMedia
              className="duck-image"
              image={this.data.productInfo.imageUrl}
            />
          </CardContent>
        </Card>
        <Button
          onClick={() => {
            this.props.seeAllProducts()
          }}
        >
          Back
        </Button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    seeAllProducts() {
      dispatch(getProductView(0))
    }
  }
}

export default connect(null, mapDispatch)(FullPageSingleProduct)
