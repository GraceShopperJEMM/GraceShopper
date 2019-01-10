import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const largeProdView = props => {
  props.selectProd(props.idProp)
}

export const SingleProduct = props => {
  return (
    <Card className="product-in-list">
      <CardMedia
        className="duck-image"
        image={props.imageUrl}
        onClick={() => largeProdView(props)}
      />
      <CardContent>
        <div className="inline">
          <div>
            <Typography variant="h5">{props.name}</Typography>
            <Typography variant="subtitle">Color: {props.color}</Typography>
            <Typography variant="subtitle">Size: {props.size}</Typography>
          </div>
          <div align="right">
            <Typography variant="h5">${props.price}</Typography>
            <IconButton aria-label="Add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
