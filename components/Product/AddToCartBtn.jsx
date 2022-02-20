/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductButton from '../ProductButton'

export default function AddToCartBtn() {
  const cartUi = useSelector(state => state.ui.cart)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let timeout
    if (!mounted) setMounted(true)
    if (mounted && !cartUi) {
      clearTimeout(timeout)
      timeout = setTimeout(() => setButtonDisabled(false), 1000)

      setButtonDisabled(true)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [cartUi])

  useEffect(() => {
    console.log(isButtonDisabled)
  }, [isButtonDisabled])

  return (
    <div className='product-button-wrapper'>
      <ProductButton isDisabled={isButtonDisabled}>Add to cart</ProductButton>
      <style jsx>{`
        .product-button-wrapper {
          white-space: nowrap;
          display: inline-block;
        }

        .product-button-wrapper[disabled='true'] {
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
