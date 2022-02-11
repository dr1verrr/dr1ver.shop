import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductPrice({ price }) {
  const optionPrice = useSelector(state => state.product?.optionPrice)

  return (
    <button type='button' className='product-info-price'>
      <span>{parseFloat(price + optionPrice)} USD</span>
      <style jsx>{`
        .product-info-price {
          background-color: #fff;
          color: #1d1f21;
          padding: 1rem 3rem;
          font-size: 2.2rem;
          font-weight: 700;
          border-radius: 3rem;
          max-width: fit-content;
          border: none;
          white-space: nowrap;
          cursor: default;
        }

        .product-info-price span {
          cursor: text;
          pointer-events: all;
          user-select: all;
        }
      `}</style>
    </button>
  )
}
