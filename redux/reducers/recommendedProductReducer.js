import { PRODUCT_RECOMMENDED_UPDATE, PRODUCT_UPDATE } from '../types'

const initialState = { selected: 'Small', count: 1, price: 0, optionPrice: 0, actionType: PRODUCT_RECOMMENDED_UPDATE }

const recommendedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_RECOMMENDED_UPDATE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default recommendedProductReducer
