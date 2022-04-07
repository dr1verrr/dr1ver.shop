import React from 'react'
import shortenNumber from '../../helpers/shortenNumber'

export default function ProductPrice({ price, isDuplicated, optionPrice }) {
  return (
    <div className='product-price'>
      <span className='inner'>
        <span className='price'>{shortenNumber(isDuplicated ? price : price + optionPrice, 2)}</span>
        <span className='currency'>USD</span>
      </span>
      <style jsx>{`
        .product-price {
          display: inline-block;
          background: #fff;
          color: #1d1f21;
          padding: 0.5rem 2rem;
          font-size: 2.5rem;
          font-weight: 500;
          min-width: 150px;
          border-radius: 3rem;
          border: none;
        }

        .inner .price {
          margin-right: 0.5rem;
          word-break: break-all;
        }

        .inner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap-reverse;
        }

        .inner .currency {
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}
