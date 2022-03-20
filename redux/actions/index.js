import { CART_ADD, CART_SHOW, MODAL_OVERRIDE, MODAL_SHOW } from '../types'

export const addToCart = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: CART_ADD, payload })
      resolve()
    })
  }
}

export const showCart = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: CART_SHOW })
      resolve()
    })
  }
}

export const showModal = payload => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: MODAL_SHOW, payload })
      setTimeout(() => {
        dispatch({ type: MODAL_OVERRIDE })
        resolve()
      }, 10)
      resolve()
    })
  }
}
