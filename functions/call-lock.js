export default function callLock(toCall, lockout) {
  let argv
  let lastCall = 0
  let timer = 0
  function recall() {
    timer = 0
    lastCall = Date.now()
    toCall(...argv)
  }
  return function (...args) {
    let now = Date.now()
    if (timer == 0) {
      if (now >= lastCall + lockout) {
        lastCall = now
        toCall(...args)
      } else {
        argv = args
        timer = setTimeout(recall, lastCall + lockout - now)
      }
    } else {
      argv = args // use most recent arguments
    }
  }
}
