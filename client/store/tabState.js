// Initial State
let tabState = /*Number(localStorage.getItem('tab')) ||*/ 0

// Action Constant
const CHANGE_TAB_VALUE = 'CHANGE_TAB_VALUE'

// Action Creator
export const changeTab = value => {
  // localStorage.setItem('tab', value.toString())
  return {
    type: CHANGE_TAB_VALUE,
    value
  }
}

export default function(state = tabState, action) {
  switch (action.type) {
    case CHANGE_TAB_VALUE:
      return action.value
    default:
      return state
  }
}
