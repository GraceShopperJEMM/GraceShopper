import React from 'react'
export default function render() {
  return (
    <div>
      <h2>Order History:</h2>
      <hr />
      <ul>
        {this.state.orders.map(order => {
          return (
            <div key={order.id}>
              <h3>Order Number: {order.id}</h3>
              <ul>
                {order.products.map(product => {
                  return (
                    <li key={product.id}>
                      <p>
                        {product.name} {`$${(product.price / 100).toFixed(2)}`}
                      </p>
                      <p>
                        Quantity: {`${product.quantity}x`} Total:{' '}
                        {`$${(product.quantity * product.price / 100).toFixed(
                          2
                        )}`}
                      </p>
                    </li>
                  )
                })}
              </ul>
              <p>
                Order Total: ${(
                  order.products.reduce(
                    (total, product) =>
                      total + product.quantity * product.price,
                    0
                  ) / 100
                ).toFixed(2)}
              </p>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
