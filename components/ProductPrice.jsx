import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductPrice({ price }) {
  const optionPrice = useSelector(state => state.product?.optionPrice)

  return (
    <button type='button' className='product-info-price'>
      <span className='wrapper'>
        <span className='price'>{parseFloat(price + optionPrice)}</span> <span className='currency'>USD</span>
      </span>
      <style jsx>{`
        .product-info-price {
          background-color: #fff;
          color: #1d1f21;
          padding: 1rem;
          font-size: 2.2rem;
          font-weight: 600;
          width: 200px;
          white-space: nowrap;
          border-radius: 3rem;
          border: none;
          white-space: nowrap;
          cursor: default;
        }
      `}</style>
    </button>
  )
}
