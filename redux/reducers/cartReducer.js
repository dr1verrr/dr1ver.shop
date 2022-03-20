import { CART_ADD, CART_REMOVE, CART_UPDATE } from '../types'

const initialState = { cartData: [], lastModified: {} }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return addProduct(state, action.payload)

    case CART_REMOVE:
      return removeProduct(state, action.payload)

    case CART_UPDATE:
      return editProduct(state, action.payload)

    default:
      return state
  }
}

const addProduct = (state, payload) => {
  return { ...state, ...payload }
}

const editProduct = (state, payload) => {
  return { ...state, ...payload }
}

const removeProduct = (state, data) => {
  const product = data.product

  return {
    ...state,
    cartData: state.cartData.filter(item =>
      product.id == item.id && product.selected === item.selected ? false : true
    ),
  }
}

export default cartReducer
