import axios from 'axios'

// Initial State
let initialProductView = 0

// Action Constant
const CHANGE_PRODUCT_VIEW = 'CHANGE_PRODUCT_VIEW'

// Action Creator
export const viewProduct = productNum => {
  return {
    type: CHANGE_PRODUCT_VIEW,
    productNum
  }
}

export default function(state = initialProductView, action) {
  switch (action.type) {
    case CHANGE_PRODUCT_VIEW:
      return action.productNum
    default:
      return state
  }
}

export const getProductView = id => dispatch => {
  if (id === 0) {
    dispatch(viewProduct(0))
  } else {
    return axios
      .get(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => dispatch(viewProduct(product)))
      .catch(console.error.bind(console))
  }
}
