import React, { memo } from 'react'
import CartItem from './CartItem'

const CartItems = ({ cartData, lastModified }) => {
  return (
    <div className='cart-items'>
      {cartData?.map(item => {
        return (
          <CartItem
            key={item.id + item.selected[0]}
            product={item}
            lastModified={
              lastModified && item.id == lastModified.id && item.selected === lastModified.selected
                ? lastModified
                : null
            }
          />
        )
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
