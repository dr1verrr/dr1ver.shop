import {
  AUTH_MODAL_HIDE,
  AUTH_MODAL_SHOW,
  CART_HIDE,
  CART_SHOW,
  MASK_HIDE,
  MENU_HIDE,
  MENU_SHOW,
  MODAL_HIDE,
  MODAL_SHOW,
} from '../types'

const initialState = {
  cart: false,
  modal: false,
  authModal: false,
  menu: false,
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_SHOW:
      return { ...state, cart: true }

    case CART_HIDE:
      return { ...state, cart: false }

    case MODAL_SHOW:
      return { ...state, modal: true }

    case MODAL_HIDE:
      return { ...state, modal: false }

    case AUTH_MODAL_SHOW:
      return { ...state, authModal: true }

    case AUTH_MODAL_HIDE:
      return { ...state, authModal: false }

    case MENU_SHOW:
      return { ...state, menu: true }

    case MENU_HIDE:
      return { ...state, menu: false }

    case MASK_HIDE:
      return initialState

    default:
      return state
  }
}

export default uiReducer
