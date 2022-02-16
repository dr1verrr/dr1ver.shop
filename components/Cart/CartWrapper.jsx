import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart'

export default function CartWrapper() {
  const selector = useSelector(state => state.ui.cart)
  const isCartVisible = useMemo(() => selector, [selector])

  return <Cart isCartVisible={isCartVisible} />
}
