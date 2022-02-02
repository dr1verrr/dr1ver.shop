import { useState } from 'react'

export default function useThrottle(func, ms) {
  const [isThrottled, setIsThrottled] = useState(false)
  const [savedArgs, setSavedArgs] = useState(null)
  const [savedThis, setSavedThis] = useState(null)

  function wrapper() {
    if (isThrottled) {
      setSavedThis(this)
      setSavedArgs(arguments)
      return
    }

    func.apply(this, arguments)
    setIsThrottled(true)

    setTimeout(() => {
      setIsThrottled(false)
      if (savedArgs) wrapper.apply(savedThis, savedArgs)
      setSavedArgs(null)
      setSavedThis(null)
    }, ms)
  }

  return wrapper
}
