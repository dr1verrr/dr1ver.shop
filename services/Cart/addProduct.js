export const addProduct = (cartData, data) => {
  const product = data.product

  let modified = []
  let flag = false
  let isOverValue = false
  let updatedProduct = {}
  let lastModified = {
    id: product.id,
    selected: product.selected,
    message: 'Product was added to the shopping cart.',
  }

  const isExist = index => cartData[index].id == product.id && cartData[index].selected === product.selected

  if (cartData.length) {
    modified = [...cartData]

    for (let index = 0; index < cartData.length; index++) {
      if (isExist(index)) {
        if (cartData[index].count == 90) {
          isOverValue = true
          break
        }

        modified[index] = updatedProduct = {
          ...product,
          count: parseInt(cartData[index].count + product.count > 90 ? 90 : cartData[index].count + product.count),
        }
        flag = true
        break
      } else if (index > cartData.length) {
        flag = false
      }
    }
  }

  if (isOverValue) {
    return {
      lastModified: { ...lastModified, message: 'Max count is already set.' },
    }
  }

  if (!cartData.length) modified = null

  if (flag) {
    return {
      cartData: modified,
      lastModified: { ...lastModified, message: 'Product was updated.' },
      product: updatedProduct,
    }
  }

  return {
    cartData: [...cartData, product],
    lastModified,
    product: { id: product.id, selected: product.selected, count: product.count },
  }
}
