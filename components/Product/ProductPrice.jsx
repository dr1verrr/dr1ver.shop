import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductPrice({ price, isDuplicated, optionPrice, type }) {
  return (
    <button type='button' className='product-info-price'>
      <span className='wrapper'>
        <span className='price'>{isDuplicated ? price : price + optionPrice}</span>{' '}
        <span className='currency'>USD</span>
      </span>
      <style jsx>{`
        .product-info-price {
          background-color: #fff;
          color: #1d1f21;
          padding: 1rem 2rem;
          font-size: 2.5rem;
          font-weight: 500;
          min-width: 150px;
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
