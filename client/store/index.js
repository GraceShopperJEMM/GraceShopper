import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cartState'
import selectedProduct from './viewProduct'
import products from './allProducts'

const reducer = combineReducers({
  user,
  cart,
  selectedProduct,
  products
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cartState'
export {getAllProductsFromServer} from './allProducts'
