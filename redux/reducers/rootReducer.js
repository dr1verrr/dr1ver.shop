import { CART_ADD } from '../types'

const initialState = []

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return [...state, action.payload]

    default:
      return state
  }
}
