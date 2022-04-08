export const removeProduct = (cartData, product) => {
  return {
    cartData: cartData.filter(item => (product.id == item.id && product.selected === item.selected ? false : true)),
  }
}
