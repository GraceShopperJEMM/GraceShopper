import React from 'react'
export default function render() {
  return (
    <div>
      <ul>
        {this.state.orders.map(order => {
          return (
            <ul key={order.id}>
              {order.products.map(product => {
                return (
                  <li key={product.id}>
                    <p>{product.name}</p>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </ul>
    </div>
  )
}
