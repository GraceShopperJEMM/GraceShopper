import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

export const SingleProduct = props => {
  return (
    <Card className="product-in-list">
      <CardMedia className="duck-image" image={props.imageUrl} />
      <CardContent>
        <div className="inline">
          <div>
            <Typography variant="h5">{props.name}</Typography>
            <Typography variant="h6">Color: {props.color}</Typography>
            <Typography variant="h6">Size: {props.size}</Typography>
          </div>
          <div align="right">
            <Typography variant="h5">${props.price / 100}</Typography>
            <IconButton aria-label="Add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
