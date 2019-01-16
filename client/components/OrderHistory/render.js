import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

export default function render() {
  return (
    <div>
      <h2>Order History:</h2>
      <hr />
      <div>
        {this.state.orders.length &&
          this.state.orders.map(order => {
            return (
              <Card className="order" key={order.id}>
                <CardContent>
                  <div>
                    <Typography variant="p">Order #{order.id}</Typography>
                    {order.productOrders.map(product => {
                      return (
                        <div key={product.id}>
                          <div
                            style={{height: '70px'}}
                            className="order-history-item"
                          >
                            <img
                              style={{height: '60px', width: 'auto'}}
                              className="duck-image"
                              src={product.product.imageUrl}
                            />
                            <div align="right">
                              <Typography
                                variant="p"
                                style={{fontWeight: 'bold'}}
                              >
                                {product.product.name}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                style={{fontStyle: 'italic', color: 'gray'}}
                              >
                                {`${product.quantity}`}x
                              </Typography>
                              <Typography
                                variant="p"
                                style={{fontStyle: 'italic'}}
                              >
                                {`$${(
                                  product.quantity *
                                  product.price /
                                  100
                                ).toFixed(2)}`}
                              </Typography>
                            </div>
                          </div>
                          <hr />
                        </div>
                      )
                    })}
                  </div>
                  <Typography variant="h6">
                    Total: $
                    {(
                      order.productOrders.reduce(
                        (total, product) =>
                          total + product.quantity * product.price,
                        0
                      ) / 100
                    ).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
