import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TotalPrice() {
  const { cartData } = useSelector(state => state.cart)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  function getTotal(cartData) {
    let value = 0
    for (let index = 0; index < cartData.length; index++) {
      value += (cartData[index].price + cartData[index].optionPrice) * cartData[index].count
    }

    return value.toFixed(2)
  }

  return `${mounted ? getTotal(cartData) : Number(0).toFixed(2)} USD`
}
