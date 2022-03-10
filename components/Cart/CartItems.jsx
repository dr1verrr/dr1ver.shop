import React, { memo, useEffect } from 'react'
import CartItem from './CartItem'

const CartItems = ({ cartData }) => {
  return (
    <div className='cart-items'>
      {cartData?.map(item => {
        return <CartItem key={item.id + item.selected} product={item} />
      })}
      <style jsx>{`
        .cart-items {
          padding: 0 3rem;
        }
      `}</style>
    </div>
  )
}

export default memo(CartItems)
