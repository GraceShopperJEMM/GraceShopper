import axios from 'axios'

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
      console.log(
        'Finished fetching user cart, dispatching:',
        res.data.productOrders
      )
      if (!res.data.productOrders) res.data.productOrders = []
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
    let arrayOfProducts = JSON.parse(localStorage.getItem('cart'))
    console.log('thunk', arrayOfProducts)
    if (!arrayOfProducts) arrayOfProducts = []

    Promise.all(
      arrayOfProducts.map(product => {
        return axios.get(`/api/products/${product.id}`)
      })
    )
      .then(products => {
        guestCart.productOrders = products.map((order, i) => {
          return {product: order.data, quantity: arrayOfProducts[i].quantity}
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
      console.log('Finished posting order, dispatching state change.')
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
