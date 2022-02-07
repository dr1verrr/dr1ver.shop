/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCart } from '../contexts/cart'
import { useLayout } from '../contexts/layout'
import CartItem from './CartItem'
import Modal from './Modal'

function Cart({ cartVisible }) {
  const { cartData, lastModified } = useCart()
  const [mounted, setMounted] = useState(false)
  const { showModal, setShowModal } = useLayout()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log('rendered')
  }, [])

  useEffect(() => {
    console.log(lastModified)
  }, [lastModified])

  if (mounted) {
    return (
      <div className='cart'>
        <div className='cart-inner'>
          <div className='cart-items'>
            {cartData?.map(item => {
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
            max-width: 400px;
            height: 100%;
            transform: ${cartVisible ? 'translateX(0)' : 'translateX(100%)'};
            z-index: 1100;
            color: #000;
            overflow-x: hidden;
            scrollbar-width: none;
          }
          .cart-items {
          }
        `}</style>
      </div>
    )
  }

  return null
}

export default Cart
