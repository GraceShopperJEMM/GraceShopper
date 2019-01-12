import React, {Component} from 'react'
import methods from './methods'
import hooks from './hooks'
import render from './render'
import localState from './localState'
import {connect} from 'react-redux'
import axios from 'axios'

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {
      orders: []
    }
    Object.keys(methods).forEach(method => {
      this[method] = methods[method].bind(this)
    })
    Object.keys(hooks).forEach(hook => {
      this[hook] = hooks[hook].bind(this)
    })
    this.render = render.bind(this)
  }

  async componentDidMount() {
    const orders = await axios.get(
      `/api/users/${this.props.user.id}/orderHistory`
    )
    this.setState({
      orders: orders.data
    })
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(OrderHistory)
