import {
  AUTH_MODAL_UPDATE,
  CART_HIDE,
  CART_SHOW,
  MASK_HIDE,
  MENU_HIDE,
  MENU_SHOW,
  MODAL_HIDE,
  MODAL_SHOW,
  PRODUCT_MODAL_HIDE,
  PRODUCT_MODAL_SHOW,
} from '../types'

const initialState = {
  cart: false,
  modal: false,
  productModal: { visible: false, slug: '' },
  authModal: {
    login: true,
    register: false,
    visible: false,
  },
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

    case AUTH_MODAL_UPDATE:
      return { ...state, authModal: { ...state.authModal, ...action.payload } }

    case MENU_SHOW:
      return { ...state, menu: true }

    case MENU_HIDE:
      return { ...state, menu: false }

    case PRODUCT_MODAL_SHOW:
      return { ...state, productModal: { visible: true, slug: action.payload } }

    case PRODUCT_MODAL_HIDE:
      return { ...state, productModal: { visible: false, slug: action.payload } }

    case MASK_HIDE:
      return initialState

    default:
      return state
  }
}

export default uiReducer
