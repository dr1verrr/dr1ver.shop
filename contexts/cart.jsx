import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

function CartProvider({ children }) {
  const [cartData, setCartData] = useLocalStorage('cart-data', [])
  const [lastModified, setLastModified] = useState({})

  useEffect(() => {
    console.log('rendered')
  }, [])

  return (
    <CartContext.Provider value={{ cartData, setCartData, lastModified, setLastModified }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
