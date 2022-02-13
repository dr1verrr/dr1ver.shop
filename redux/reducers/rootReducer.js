import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import productReducer from './productReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({ product: productReducer, cart: cartReducer, ui: uiReducer })

export default rootReducer
