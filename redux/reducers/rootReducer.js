import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import productReducer from './productReducer'
import productModalReducer from './productModalReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  product: productReducer,
  productModal: productModalReducer,
  cart: cartReducer,
  ui: uiReducer,
})

export default rootReducer
