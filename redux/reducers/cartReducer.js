import { CART_UPDATE } from '../types'

const initialState = { cartData: [], lastModified: {} }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_UPDATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default cartReducer
