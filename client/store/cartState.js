import axios from 'axios'

// Initial Cart State
const initialCart = {}

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
      // console.log('userId:', userId)
      const res = await axios.get(`/api/users/${userId}/cart`)
      const cart = res.data
      // console.log('User Cart:', cart)
      dispatch(gotCart(cart))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default function(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
