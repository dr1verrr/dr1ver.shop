export default function throttle(f, ms) {
  let isCoolDown = true,
    queue = []

  function wrapper(...args) {
    queue.push(args)

    if (!isCoolDown) return

    isCoolDown = false
    setTimeout(function () {
      isCoolDown = true
      if (queue[0] !== undefined) {
        f.apply(this, queue.slice(-1))
        queue = []
      }
    }, ms)

    return (function () {
      f.apply(this, args)
      queue = []
    })()
  }
  return wrapper
}
