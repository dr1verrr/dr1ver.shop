import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import productReducer from './productReducer'
import recommendedProductReducer from './recommendedProductReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
  product: productReducer,
  recommendedModalProduct: recommendedProductReducer,
  cart: cartReducer,
  ui: uiReducer,
})

export default rootReducer
