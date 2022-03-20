const findDuplicateProduct = (cartData, updated, params) => {
  let modified = [...cartData],
    flag = false,
    newProductIndex = 0,
    existProductsSelected = []

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
      if (existProductsSelected[index] === updated.option.selected && params.option.old !== updated.option.selected) {
        isDuplicateExist = true
        flag = false
      }

      if (index == existProductsSelected.length - 1 && !isDuplicateExist) {
        modified[newProductIndex] = {
          ...modified[newProductIndex],
          count: updated.count,
          optionPrice: updated.option.price,
          selected: updated.option.selected,
        }
      }
    }
  }

  if (!flag) return { lastModified: { id: params.id, selected: updated.option.selected } }

  return { cartData: modified, lastModified: { id: params.id, selected: updated.option.selected } }
}

export default findDuplicateProduct
