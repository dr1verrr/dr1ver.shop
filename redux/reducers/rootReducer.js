import { CART_ADD } from '../types'
import { defineState } from 'redux-localstore'

const defaultState = []

const initialState = defineState(defaultState)('cart')

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return [...state, action.payload]

    default:
      return state
  }
}
