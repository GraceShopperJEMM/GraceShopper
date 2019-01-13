import axios from 'axios'
import {array, arrayOf} from 'prop-types'

// Initial Cart State
const initialCart = {productOrders: []}

// Action constants
const GET_CART = 'GET_CART'
const SET_GUEST_CART = 'SET_GUEST_CART'

// Action creators
const gotCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const setGuestCart = cart => {
  return {
    type: SET_GUEST_CART,
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

export const populateGuestCart = () => {
  return dispatch => {
    const guestCart = initialCart
    let arrayOfProductIds = JSON.parse(localStorage.getItem('cart'))
    if (!arrayOfProductIds) arrayOfProductIds = []

    Promise.all(
      arrayOfProductIds.map(id => {
        // console.log(id)
        return axios.get(`/api/products/${id}`)
        // console.log('Product Data:', product.data)
      })
    )
      .then(products => {
        guestCart.productOrders = products.map(order => {
          return {product: order.data}
        })
        return guestCart
      })
      .then(cart => dispatch(setGuestCart(cart)))
      .catch(err => {
        console.log(err)
      })
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
      return {...state, ...action.cart}
    case SET_GUEST_CART:
      return {...state, ...action.cart}
    default:
      return state
  }
}
