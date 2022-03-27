export default function filterCartData(cartData, product) {
  return {
    cartData: cartData.filter(item => (product.id == item.id && product.selected === item.selected ? false : true)),
  }
}
