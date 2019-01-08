import React from 'react'
import {Router, NavLink} from 'react-router-dom'
import axios from 'axios'

export default class LandingPage extends React.Component {
  state = {
    products: []
  }

  async componentDidMount() {
    const {data} = axios.get('/api/products')
    this.setState({
      products: data
    })
  }

  render() {
    return (
      <ul>
        {this.state.products.map(product => {
          return (
            <li>
              <p>{product.name}</p>
            </li>
          )
        })}
      </ul>
    )
  }
}
