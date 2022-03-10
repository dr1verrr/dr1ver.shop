import { PRODUCT_UPDATE } from '../types'

const initialState = { selected: 'Small', count: 1, price: 0, optionPrice: 0, actionType: PRODUCT_UPDATE }

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default productReducer
