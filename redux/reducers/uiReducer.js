import {
  AUTH_MODAL_UPDATE,
  CART_HIDE,
  CART_SHOW,
  MASK_HIDE,
  MENU_HIDE,
  MENU_SHOW,
  MODAL_HIDE,
  MODAL_OVERRIDE,
  MODAL_SHOW,
  PRODUCT_MODAL_HIDE,
  PRODUCT_MODAL_SHOW,
  PROGRESS_CHANGE,
} from '../types'

const initialState = {
  cart: false,
  modal: { visible: false, override: false, message: '' },
  productModal: { visible: false, slug: '' },
  authModal: {
    login: true,
    register: false,
    visible: false,
  },
  progressBar: '',
  menu: false,
  video: false,
}

const uiReducer = (state = initialState, action) => {
  const modal = state.modal

  switch (action.type) {
    case CART_SHOW:
      return { ...state, cart: true }

    case CART_HIDE:
      return { ...state, cart: false }

    case MODAL_SHOW:
      if (!modal.visible) {
        return {
          ...state,
          modal: { visible: true, override: false, message: action.payload || modal.message },
        }
      }

      if (modal.visible) {
        return {
          ...state,
          modal: { visible: false, override: true, message: action.payload || modal.message },
        }
      }

    case MODAL_OVERRIDE:
      return {
        ...state,
        modal: {
          visible: true,
          override: false,
          message: action.payload || modal.message,
        },
      }

    //return {
    //  ...state,
    //  modal: {
    //    visible: state.modal.override || !state.modal.visible ? true : false,
    //    override: state.modal.visible ? true : false,
    //    message: action.payload || state.modal.message,
    //  },
    //}

    case MODAL_HIDE:
      return { ...state, modal: { visible: false, override: false } }

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
      return { ...initialState, modal: { ...modal } }

    case PROGRESS_CHANGE:
      return { ...state, progressBar: action.payload || state.progressBar }

    default:
      return state
  }
}

export default uiReducer
