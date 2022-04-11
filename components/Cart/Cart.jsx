import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CART_HIDE } from '../../redux/types'
import { showModal } from '../../redux/actions'
import CartProductModal from '../CartProductModal'
import CartItems from './CartItems'
import CartTotal from './CartTotal'
import Button from '../Button'

function Cart({ isCartVisible }) {
  const [mounted, setMounted] = useState(false)
  const dispatch = useDispatch()
  const { cartData, lastModified } = useSelector(state => state.cart)
  const hideCart = () => dispatch({ type: CART_HIDE })
  const checkoutHandler = () => dispatch(showModal('Temporary cannot accept payments :/'))

  useEffect(() => {
    if (!mounted) setMounted(true)
  }, [])

  return mounted ? (
    <div className='cart-wrapper'>
      <CartProductModal />
      <div className={`cart ${isCartVisible ? 'enter-done' : 'exit-active'}`} visible={`${isCartVisible}`}>
        <div className='cart-vision-switcher' onClick={hideCart}>
          <div className='icon modal__cart-continue-shopping-arrow icon__animated'>
            <svg className='arrow4' xmlns='http://www.w3.org/2000/svg'>
              <path d='M2.2 16L16.7 1.5c.4-.4.4-.9 0-1.3s-.9-.4-1.3 0L.3 15.4c-.4.4-.4.9 0 1.3l15.2 15.1c.2.2.4.3.6.3.2 0 .5-.1.6-.3.4-.4.4-.9 0-1.3L2.2 16z'></path>
            </svg>
          </div>
          <span>Continue shopping</span>
        </div>
        <div className='cart-inner'>
          <div className='my-purchases'>
            <div className='my-purchases-title'>My purchases</div>
            <div className='my-purchases-list'>
              <CartItems cartData={cartData} lastModified={lastModified} />
            </div>
          </div>
          <div className='cart-footer'>
            <CartTotal cartData={cartData} />
            <div className='cart-checkout'>
              <Button onClick={checkoutHandler}>CHECKOUT</Button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cart {
          transform: translateX(100%);
          content: '';
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          width: 380px;
          z-index: 1600;
          color: #000;
          overflow-x: hidden;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }

        .enter-done {
          transition: transform 750ms cubic-bezier(0.29, 0.58, 0.05, 1);
        }

        .cart-footer {
          padding: 30px 30px 0;
        }
        .cart-checkout {
          max-width: fit-content;
          margin: 2rem auto;
        }

        .my-purchases {
          display: flex;
          flex-direction: column;
          border-bottom: 2px solid #484848;
          padding-bottom: 5rem;
        }
        .my-purchases-title {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 18px;
          font-size: 30px;
          line-height: 78px;
        }
        .my-purchases-title:after {
          content: '';
          flex: 1 1;
          height: 2px;
          margin-left: 18px;
          margin-top: 6px;
          background: #000;
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
          max-height: 112px;
          letter-spacing: 2px;
          font-size: 1.6rem;
          cursor: pointer;
        }

        .exit-active {
          transition: transform 750ms cubic-bezier(0.77, 0, 0.175, 1);
        }
        @media (max-width: 440px) {
          .cart {
            width: 100%;
          }
        }
        @media (max-width: 620px) {
          .cart-vision-switcher {
            max-height: 75px;
            border-bottom: 1px solid #e0e3e6;
          }
        }
      `}</style>
    </div>
  ) : null
}

export default memo(Cart)
