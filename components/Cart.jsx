/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react'
import { useCart } from '../contexts/cart'
import { useLayout } from '../contexts/layout'
import CartItem from './CartItem'

function Cart() {
  const { cartData, lastModified } = useCart()
  const [mounted, setMounted] = useState(false)
  //const { setCartVisibility, isCartVisible } = useLayout()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {}, [lastModified])

  if (mounted) {
    return (
      <div className='cart'>
        <div className='cart-vision-switcher' onClick={() => setCartVisibility(false)}>
          <div className='icon modal__cart-continue-shopping-arrow icon__animated'>
            <svg className='arrow4' xmlns='http://www.w3.org/2000/svg' viewBox=''>
              <path d='M2.2 16L16.7 1.5c.4-.4.4-.9 0-1.3s-.9-.4-1.3 0L.3 15.4c-.4.4-.4.9 0 1.3l15.2 15.1c.2.2.4.3.6.3.2 0 .5-.1.6-.3.4-.4.4-.9 0-1.3L2.2 16z'></path>
            </svg>
          </div>
          <span>Continue shopping</span>
        </div>
        <div className='cart-inner'>
          {!cartData.length && <div>No products in cart</div>}
          <div className='cart-items'>
            {cartData?.map(item => {
              return <CartItem key={item.id + item.options} product={item} />
            })}
          </div>
        </div>
        <style jsx>{`
          .cart {
            transition: transform 0.4s ease;
            content: '';
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            min-width: fit-content;
            width: 400px;
            transform: ${isCartVisible ? 'translateX(0)' : 'translateX(100%)'};
            z-index: 1100;
            color: #000;
            overflow-x: hidden;
            scrollbar-width: none;
            user-select: none;
          }

          .cart-items {
            padding: 0 3rem;
          }

          .cart-inner {
            min-height: 100vh;
            height: auto;
            background: #fff;
            padding-bottom: 150px;
          }

          .modal__cart-continue-shopping-arrow,
          .modal__cart-continue-shopping-arrow svg {
            width: 17px;
            height: 32px;
          }

          .modal__cart-continue-shopping-arrow {
            padding-right: 4rem;
          }

          @media (max-width: 440px) {
            .cart {
              width: 100%;
            }
          }

          .cart-vision-switcher {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 2px solid #e0e3e6;
            background: #fff;
            padding: 2rem 0;
            height: 100%;
            text-transform: uppercase;
            max-height: 106.5px;
            letter-spacing: 1.75px;
            font-size: 1.5rem;
            cursor: pointer;
          }

          @media (max-width: 567px) {
            .cart-vision-switcher {
              max-height: 78px;
            }
          }
        `}</style>
      </div>
    )
  }

  return null
}

export default memo(Cart)
