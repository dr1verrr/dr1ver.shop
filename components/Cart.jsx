import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCart } from '../contexts/cart'
import CartItem from './CartItem'

function Cart({ cartVisible }) {
  const { cartData } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading && cartData.length) setLoading(false)
  }, [cartData])

  //function getProductOptions(data) {
  //  const selected = data.Custom_Field.map(fld => fld.options.split('|'))
  //  return selected.map(s => {
  //    const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
  //    console.log(option)
  //    return option
  //  })
  //}

  return (
    <div className='cart'>
      <div className='cart-inner'>
        <div className='cart-items'>
          {!loading &&
            cartData.map(item => {
              return <CartItem key={item.id + item.options} product={item} cartVisible={cartVisible} />
            })}
        </div>
      </div>
      <style jsx>{`
        .cart {
          transition: all 0.3s ease;
          content: '';
          background: #fafafa;
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          min-width: fit-content;
          width: 100%;
          max-width: 450px;
          height: 100%;
          transform: ${cartVisible ? 'translateX(0)' : 'translateX(100%)'};
          z-index: 1100;
          color: #000;
          overflow-x: hidden;
          scrollbar-width: none;
        }
        .cart-items {
          padding: 1.5rem;
        }
      `}</style>

      <style jsx global>
        {`
          body {
            overflow: ${cartVisible ? 'hidden' : 'auto'};
          }
        `}
      </style>
    </div>
  )
}

export default Cart
