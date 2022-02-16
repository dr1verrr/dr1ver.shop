import React, { Fragment, memo } from 'react'
import CartItem from './CartItem'

function CartItems({ cartData }) {
  return (
    <div className='cart-items'>
      {cartData?.map(item => {
        return <CartItem key={item.id + item.options} product={item} />
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
