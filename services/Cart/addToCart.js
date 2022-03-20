const addToCart = (cartData, data) => {
  const newProduct = data.product

  let modified = []
  let flag = false
  let isOverValue = false
  let lastModified = {
    id: newProduct.id,
    selected: newProduct.selected,
    message: 'Product was added to the shopping cart.',
  }

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

  if (isOverValue) {
    return { cartData, lastModified: { ...lastModified, message: 'Max count is already set.' } }
  }

  if (!cartData.length) modified = null

  if (flag) {
    return { cartData: modified, lastModified: { ...lastModified, message: 'Product was updated.' } }
  }

  return { cartData: [...cartData, newProduct], lastModified }
}

export default addToCart
