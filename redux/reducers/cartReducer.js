import { CART_ADD, CART_REMOVE, CART_UPDATE } from '../types'

const initialState = { cartData: [], lastModified: {} }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD:
      return findExist(state, action.payload)

    case CART_REMOVE:
      return removeProduct(state, action.payload)

    case CART_UPDATE:
      return editProduct(state, action.payload)

    default:
      return state
  }
}

function removeProduct(state, product) {
  return {
    ...state,
    cartData: state.cartData.filter(item =>
      product.id == item.id && product.selected === item.selected ? false : true
    ),
  }
}

const editProduct = (state, newProduct) => {
  const cartData = state.cartData
  let modified = [...cartData]
  let flag = false
  let newProductIndex = 0
  let existProductsSelected = []
  const found = index => cartData[index].id == newProduct.id && cartData[index].selected === newProduct.oldSelected

  if (!flag) {
    for (let index = 0; index < cartData.length; index++) {
      if (cartData[index].id == newProduct.id) {
        existProductsSelected.push(cartData[index].selected)

        if (found(index)) {
          newProductIndex = index
        }
      }

      if (index == cartData.length - 1) {
        flag = true
      }
    }
  }

  if (flag) {
    let isDuplicateExist = false

    for (let index = 0; index < existProductsSelected.length; index++) {
      if (existProductsSelected[index] === newProduct.selected) {
        isDuplicateExist = true
        flag = false
      }

      if (index == existProductsSelected.length - 1 && !isDuplicateExist) {
        modified[newProductIndex] = {
          ...modified[newProductIndex],
          optionPrice: newProduct.optionPrice,
          selected: newProduct.selected,
        }
      }
    }
  }

  if (!flag) return { ...state, lastModified: { id: newProduct.id, selected: newProduct.selected } }

  return { cartData: modified, lastModified: state.lastModified }
}

const findExist = (state, newProduct) => {
  const cartData = state.cartData
  let modified = []
  let flag = false
  let isOverValue = false
  let lastModified = {}

  const isExist = index => cartData[index].id == newProduct.id && cartData[index].selected === newProduct.selected

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

  lastModified = { id: newProduct.id, selected: newProduct.selected }

  if (flag) {
    return { cartData: modified, lastModified }
  }

  return { cartData: [...cartData, newProduct], lastModified }
}

export default cartReducer
