import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import shortenNumber from '../helpers/shortenNumber'

export default function TotalPrice({ isHovered }) {
  const { cartData } = useSelector(state => state.cart)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!!isHovered) return getTotal(cartData)
  }, [isHovered])

  function getTotal(cartData) {
    let value = 0
    for (let index = 0; index < cartData.length; index++) {
      value += (cartData[index].price + cartData[index].optionPrice) * cartData[index].count
    }

    if (isHovered) return value.toFixed(2)

    return shortenNumber(value, 2)
  }

  return `${mounted ? getTotal(cartData) : Number(0).toFixed(2)} USD`
}
