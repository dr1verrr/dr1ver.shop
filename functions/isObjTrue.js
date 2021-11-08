export default function isObjTrue(product) {
  if (product && Object.keys(product).length) {
    return true
  }
  return false
}
