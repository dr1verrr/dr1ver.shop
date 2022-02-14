import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CART_HIDE } from '../../redux/types'
import CartItems from './CartItems'

export default function Cart() {
  const { cartData = [] } = useSelector(state => state.cart)
  const isCartVisible = useSelector(state => state.ui.cart)
  const dispatch = useDispatch()

  return (
    <div className='cart' visible={`${isCartVisible}`}>
      <div className='cart-vision-switcher' onClick={() => dispatch({ type: CART_HIDE })}>
        <div className='icon modal__cart-continue-shopping-arrow icon__animated'>
          <svg className='arrow4' xmlns='http://www.w3.org/2000/svg'>
            <path d='M2.2 16L16.7 1.5c.4-.4.4-.9 0-1.3s-.9-.4-1.3 0L.3 15.4c-.4.4-.4.9 0 1.3l15.2 15.1c.2.2.4.3.6.3.2 0 .5-.1.6-.3.4-.4.4-.9 0-1.3L2.2 16z'></path>
          </svg>
        </div>
        <span>Continue shopping</span>
      </div>
      <div className='cart-inner'>
        <CartItems cartData={cartData} />
        {!cartData.length && (
          <div className='no-products'>
            <span>No</span>
            <span>products</span>
            <span>in</span>
            <span>cart</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .cart {
          transform: translateX(100%);
          transition: transform 0.75s cubic-bezier(0.29, 0.58, 0.05, 1);
          content: '';
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          min-width: fit-content;
          width: 400px;
          z-index: 1500;
          color: #000;
          overflow-x: hidden;
          scrollbar-width: none;
          user-select: none;
          scroll-behavior: smooth;
        }

        .cart[visible='true'] {
          transform: translateX(0%);
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

        .no-products {
          font-size: 3rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          padding-top: 2rem;
          text-transform: uppercase;
          text-align: center;
        }

        .no-products span {
          border-radius: 10px;
          margin: 1rem;
          min-width: fit-content;
          width: 75%;
        }

        .no-products span:nth-child(2) {
          background: #333;
          color: #fff;
        }

        .no-products span:nth-child(2n + 1) {
          background: #eee;
        }

        @media (max-width: 440px) {
          .cart {
            width: 100%;
          }
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
