const updateProduct = (cartData, changedParams, params) => {
  let modified = [...cartData],
    flag = false,
    newProductIndex = 0,
    existProductsSelected = [],
    updatedProduct = {}

  const found = index => cartData[index].id == params.id && cartData[index].selected === params.option.old

  if (!flag) {
    for (let index = 0; index < cartData.length; index++) {
      if (cartData[index].id == params.id) {
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
      if (
        existProductsSelected[index] === changedParams.option.selected &&
        params.option.old !== changedParams.option.selected
      ) {
        isDuplicateExist = true
        flag = false
      }

      if (index == existProductsSelected.length - 1 && !isDuplicateExist) {
        modified[newProductIndex] = updatedProduct = {
          ...modified[newProductIndex],
          count: changedParams.count,
          optionPrice: changedParams.option.price,
          selected: changedParams.option.selected,
        }
      }
    }
  }

  if (!flag) return { lastModified: { id: params.id, selected: changedParams.option.selected } }

  return {
    cartData: modified,
    lastModified: { id: params.id, selected: changedParams.option.selected },
    product: updatedProduct,
  }
}

export default updateProduct
