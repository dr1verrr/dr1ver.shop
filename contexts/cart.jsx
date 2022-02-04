import React, { createContext, useContext, useEffect, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

function CartProvider({ children }) {
  const [cartData, setCartData] = useLocalStorage('cart-data', [])

  useEffect(() => {
    console.log('rendered')
  }, [])

  return <CartContext.Provider value={{ cartData, setCartData }}>{children}</CartContext.Provider>
}

export default CartProvider
