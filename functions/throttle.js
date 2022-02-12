export default function throttle(fn, ms) {
  let timeout
  function exec() {
    fn.apply()
  }
  function clear() {
    timeout == undefined ? null : clearTimeout(timeout)
  }
  if (fn !== undefined && ms !== undefined) {
    timeout = setTimeout(exec, ms)
  } else {
    console.error('callback function and the timeout must be supplied')
  }
  // API to clear the timeout
  throttle.clearTimeout = function () {
    clear()
  }
}
