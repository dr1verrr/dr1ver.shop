import { CART_ADD, CART_REMOVE, CART_UPDATE } from '../types'

const initialState = { cartData: [], lastModified: {} }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return findExist(state, action.payload)

    case CART_REMOVE:
      return removeProduct(state, action.payload)
    //case CART_UPDATE:
    //  return updateProduct(state, action.payload)

    default:
      return state
  }
}

function removeProduct(state, product) {
  return {
    ...state,
    cartData: state.cartData.filter(item => (product.id == item.id && product.options === item.options ? false : true)),
  }
}

//const updateProduct = (state, newProduct) => {
//  const cartData = state.cartData
//  const isExist = index => cartData[index].id == newProduct.id && cartData[index].options === newProduct.options

//  for (let index = 0; index < cartData.length; index++) {
//    const element = cartData[index]
//  }
//}

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
}

export default cartReducer
