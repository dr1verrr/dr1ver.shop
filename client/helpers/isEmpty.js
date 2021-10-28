export default function isEmpty(value) {
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return value.length == 0
  } else if (value != null && typeof value === 'object') {
    return Object.getOwnPropertyNames(value).length == 0
  } else {
    return !(value || value === 0)
  }
}
