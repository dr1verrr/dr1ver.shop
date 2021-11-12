import { CART_ADD, GET_TOTAL } from '../types'

export const addToCart = data => async dispatch => {
  return dispatch({ type: CART_ADD, payload: data })
}

export const getTotal = () => dispatch => {
  return dispatch({ type: GET_TOTAL })
}
