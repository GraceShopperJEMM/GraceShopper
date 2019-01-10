import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton
} from '@material-ui/core'
import {withRouter, Route, Redirect, Switch} from 'react-router-dom'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const largeView = props => {
  console.log('we want to view duck:', props.idProp)
  return <Redirect to="/products/id" />
}

export const SingleProduct = props => {
  return (
    <Card className="product-in-list">
      <CardMedia
        className="duck-image"
        image={props.imageUrl}
        onClick={() => largeView(props)}
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
