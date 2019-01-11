import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import tab from './tabState'
import cart, {getCartFromServer} from './cartState'
import viewProduct from './viewProduct'

const reducer = combineReducers({
  user,
  tab,
  cart,
  viewProduct
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export {changeTab} from './tabState'
export {getCartFromServer} from './cartState'
