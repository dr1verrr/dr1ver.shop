import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CART_HIDE } from '../redux/types'
import CartItem from './CartItem'

export default function Cart() {
  const { cartData = [] } = useSelector(state => state.cart)
  const isCartVisible = useSelector(state => state.ui.cart)
  const [mounted, setMounted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!mounted && isCartVisible) setMounted(true)
  }, [isCartVisible])

  return (
    <div className='cart'>
      <div className='cart-vision-switcher' onClick={() => dispatch({ type: CART_HIDE })}>
        <div className='icon modal__cart-continue-shopping-arrow icon__animated'>
          <svg className='arrow4' xmlns='http://www.w3.org/2000/svg' viewBox=''>
            <path d='M2.2 16L16.7 1.5c.4-.4.4-.9 0-1.3s-.9-.4-1.3 0L.3 15.4c-.4.4-.4.9 0 1.3l15.2 15.1c.2.2.4.3.6.3.2 0 .5-.1.6-.3.4-.4.4-.9 0-1.3L2.2 16z'></path>
          </svg>
        </div>
        <span>Continue shopping</span>
      </div>
      <div className='cart-inner'>
        {mounted && !cartData.length && <div>No products in cart</div>}
        <div className='cart-items'>
          {mounted &&
            cartData?.map(item => {
              //CartItem need to be rewrited. The reason is performance
              return <CartItem key={item.id + item.options} product={item} />
            })}
        </div>
      </div>
      <style jsx>{`
        .cart {
          will-change: transform;
          transition: transform 0.75s cubic-bezier(0.96, 0, 0.13, 1);
          content: '';
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          min-width: fit-content;
          width: 400px;
          transform: ${isCartVisible ? 'translateX(0)' : 'translateX(100%)'};
          z-index: 1500;
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
          letter-spacing: 1.5px;
          font-weight: 500;
          font-size: 1.6rem;
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
