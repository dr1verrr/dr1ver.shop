import { useEffect, useRef } from 'react'

export default function useDebouncedFunction(func, delay) {
  const ref = useRef()

  useEffect(() => {
    return () => {
      clearTimeout(ref.current)
    }
  }, [])

  return (...args) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => func(...args), delay)
  }
}
