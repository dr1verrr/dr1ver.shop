import React from 'react'
import TotalPrice from '../TotalPrice'

export default function CartTotal() {
  return (
    <div className='cart-total'>
      <div className='cart-total-label'>TOTAL: </div>
      <div className='cart-total-price'>
        <TotalPrice />
      </div>
      <style jsx>
        {`
          .cart-total {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .cart-total-label {
            font-size: 1.4rem;
            color: #818d92;
          }
          .cart-total-price {
            font-size: 2.5rem;
            font-weight: 700;
          }
        `}
      </style>
    </div>
  )
}
