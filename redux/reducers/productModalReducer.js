import { PRODUCT_RECOMMENDED_UPDATE, RECOMMENDED_PRODUCT_MODAL_HIDE } from '../types'

const initialState = {
  selected: 'Small',
  count: 1,
  price: 1.84,
  optionPrice: 0,
  actionType: PRODUCT_RECOMMENDED_UPDATE,
}

const productModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_RECOMMENDED_UPDATE:
      return { ...state, ...action.payload }
    case RECOMMENDED_PRODUCT_MODAL_HIDE:
      return initialState

    default:
      return state
  }
}

export default productModalReducer
