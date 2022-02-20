import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart'

export default function CartWrapper() {
  const isCartVisible = useSelector(state => state.ui.cart)

  return <Cart isCartVisible={isCartVisible} />
}
