import React, { createContext, useContext } from 'react'
import { useSelector } from 'react-redux'

const ProductContext = createContext()

export default function ProductProvider({ children, type }) {
  const productInfo = useSelector(state => state[type])

  return (
    <ProductContext.Provider value={{ productInfo, type, actionType: productInfo.actionType }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductInfo = () => useContext(ProductContext)
