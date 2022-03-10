/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductButton from '../ProductButton'
import Spinner from '../Spinner'

export default function AddToCartBtn({ type }) {
  const cartUi = useSelector(state => state.ui.cart)
  const progress = useSelector(state => state.ui.progress[type])
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

  return (
    <div className='product-button-wrapper'>
      <ProductButton isDisabled={isButtonDisabled} progress={progress}>
        <span>Add to cart</span>

        {progress && (
          <div className='spinner-wrapper'>
            <Spinner color='#000' borderWidth={5} />
          </div>
        )}
      </ProductButton>

      <style jsx>{`
        .product-button-wrapper {
          white-space: nowrap;
          display: inline-block;
          position: relative;
          margin: 0 0 2rem;
        }

        .product-button-wrapper span {
          opacity: ${progress ? 0 : 1};
          font-size: inherit;
        }

        .product-button-wrapper[disabled='true'] {
          pointer-events: none;
        }

        .spinner-wrapper {
          position: absolute;
          right: 19px;
          left: 0;
          top: 0;
        }
      `}</style>
    </div>
  )
}
