import axios from 'axios'

// Initial Cart State
const initialCart = {productOrders: []}

// Action constants
const GET_CART = 'GET_CART'

// Action creators
const gotCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

// Thunk creators
export const getCartFromServer = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}/cart`)
      const cart = res.data
      dispatch(gotCart(cart))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const checkoutOnServer = userId => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}/placeOrder`)
      dispatch(getCartFromServer(userId))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default function(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return {productOrders: [], ...action.cart}
    default:
      return state
  }
}
