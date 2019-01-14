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

  componentDidMount() {
    console.log('Product Info:', this.props.selectedProduct)
    this.props.fetchProductData(this.props.match.params.id)
  }

  render() {
    if (!this.props.selectedProduct.id) return <h1>Loading...</h1>
    return (
      <div align="center">
        <Card>
          <CardContent>
            <Typography variant="h5">
              {this.props.selectedProduct.name}
            </Typography>
            <Typography variant="h5">
              {this.props.selectedProduct.color}
            </Typography>
            <Typography variant="h5">
              ${this.props.selectedProduct.price}
            </Typography>
            <Typography variant="h6">
              Size: {this.props.selectedProduct.size}
            </Typography>
            <CardMedia
              className="duck-image"
              image={this.props.selectedProduct.imageUrl}
            />
          </CardContent>
        </Card>
        <Button
          onClick={() => {
            this.props.history.push('/products')
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
    },
    fetchProductData(id) {
      dispatch(getProductView(id))
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
    selectedProduct: state.selectedProduct
  }
}

export default connect(mapStateToProps, mapDispatch)(FullPageSingleProduct)
