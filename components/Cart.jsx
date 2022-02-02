import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/auth'
import useOnClickOutside from '../hooks/useOnClickOutside'
import CartItem from './CartItem'

export default function Cart() {
  const { cartVisible, setCartVisible, cartData } = useAuth()
  const cartRef = useRef(null)
  const handler = useCallback(() => setCartVisible(), [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (cartVisible && cartData.length && loading) setLoading(false)
  }, [cartData, cartVisible, loading])

  useOnClickOutside(cartRef, cartVisible ? handler : () => {})

  //function getProductOptions(data) {
  //  const selected = data.Custom_Field.map(fld => fld.options.split('|'))
  //  return selected.map(s => {
  //    const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
  //    console.log(option)
  //    return option
  //  })
  //}

  return (
    <div className='cart' ref={cartRef}>
      <div className='cart-inner'>
        <div className='cart-items'>
          {!loading &&
            cartData.map(item => {
              return <CartItem key={item.id + item.options} product={item} />
            })}
        </div>
      </div>
      <style jsx>{`
        .cart {
          transition: all 0.5s ease-in-out;
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

          body::after {
            position: absolute;
            content: '';
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: #000;
            opacity: ${cartVisible ? 0.5 : 0};
            z-index: ${cartVisible ? 1000 : -100};
            pointer-events: all;
          }
        `}
      </style>
    </div>
  )
}
