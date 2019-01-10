// Initial State
let initialProductView = 'None'

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
      return action.product_num
    default:
      return state
  }
}
