import axios from 'axios'

// Constants
const GOT_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

// Initial State
const initialProducts = []

// Action Creators
export const gotAllProducts = products => {
  return {
    type: GOT_ALL_PRODUCTS,
    products
  }
}

export const getAllProductsFromServer = () => {
  return async dispatch => {
    try {
      const products = (await axios.get('/api/products')).data
      dispatch(gotAllProducts(products))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default function allProductsReducer(
  defaultProducts = initialProducts,
  action
) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.products
    default:
      return defaultProducts
  }
}
