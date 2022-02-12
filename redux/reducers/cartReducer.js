import { CART_ADD, CART_REMOVE } from '../types'

const initialState = { cartData: [], lastModified: {} }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return findExist(state, action.payload)

    case CART_REMOVE:
      return removeProduct(state.cartData, action.payload)

    default:
      return state
  }
}

function removeProduct(cartArr, product) {
  return cartArr.filter(item => (product.id == item.id && product.options === item.options ? false : true))
  //setModal({
  //  type: 'SHOW_MODAL',
  //  payload: {
  //    title: '',
  //    message: 'The product is removed from the basket.',
  //  },
  //})
}

const findExist = (state, newProduct) => {
  const cartData = state.cartData
  let modified = []
  let flag = false
  let isOverValue = false
  let lastModified = {}

  const isExist = index => cartData[index].id == newProduct.id && cartData[index].options === newProduct.options

  if (cartData.length) {
    modified = [...cartData]

    for (let index = 0; index < cartData.length; index++) {
      if (isExist(index)) {
        if (cartData[index].count == 99) {
          isOverValue = true
          break
        }

        modified[index] = {
          ...newProduct,
          count: parseInt(
            cartData[index].count + newProduct.count > 99 ? 99 : cartData[index].count + newProduct.count
          ),
        }
        flag = true
        break
      } else if (index > cartData.length) {
        flag = false
      }
    }
  }

  if (isOverValue) return state

  if (!cartData.length) modified = null

  lastModified = { id: newProduct.id, options: newProduct.options }

  if (flag) {
    return { cartData: modified, lastModified }
  }

  return { cartData: [...cartData, newProduct], lastModified }
  //setModal({
  //  type: 'SHOW_MODAL',
  //  payload: { title: '', message: 'The product was added to the shopping cart.' },
  //})
  //setCartVisibility(true)
}

export default cartReducer
