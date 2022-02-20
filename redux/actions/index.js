import { CART_ADD, CART_SHOW, MODAL_SHOW } from '../types'
import { batch } from 'react-redux'

export const addToCart = payload => {
  return dispatch => {
    batch(() => {
      dispatch({ type: CART_ADD, payload })
      dispatch({ type: CART_SHOW })
      return dispatch({ type: MODAL_SHOW, payload: 'Product was added to the shopping cart.' })
    })
  }
}
