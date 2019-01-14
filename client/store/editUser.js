import axios from 'axios'

// action types
const SINGLE_USER = 'SINGLE_USER'

// initial state
const user = {}

// action creators
const singleUser = user => ({
  type: SINGLE_USER,
  payload: user
})

// Thunk creator

export const modifyUser = (user, id) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, user)
    dispatch(singleUser(data))
  } catch (error) {
    console.error(error)
  }
}

export const reducerName = (state = user, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return
    default:
      return state
  }
}
