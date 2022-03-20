import Image from 'next/image'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../contexts/auth'
import { showModal } from '../../redux/actions'
import { CART_REMOVE, PRODUCT_MODAL_SHOW } from '../../redux/types'
import CartItemInfo from './CartItemInfo'

const CartItem = ({ product, lastModified }) => {
  const dispatch = useDispatch()
  const showProductModal = () => dispatch({ type: PRODUCT_MODAL_SHOW, payload: product.slug })
  const { isAuthenticated } = useAuth()
  const itemRef = useRef()
  const [isFocused, setFocused] = useState(false)

  function isInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  useEffect(() => {
    if (lastModified) {
      if (!isInViewport(itemRef.current)) {
        setFocused(true)

        itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [lastModified])

  const removeProduct = () => {
    dispatch({ type: CART_REMOVE, payload: { product, isAuthenticated } })
    dispatch(showModal('Product was removed from the basket.'))
  }

  return (
    <div className={`cart-item ${isFocused ? 'focused' : ''}`} ref={itemRef} onAnimationEnd={() => setFocused(false)}>
      <div className='cart-left'>
        <div className='item-wrapper'>
          <div className='item-remove' onClick={removeProduct}>
            <svg xmlns='http://www.w3.org/2000/svg'>
              <path d='M7 .6L6.4 0 3.5 2.9.6 0 0 .6l2.9 2.9L0 6.4l.6.6 2.9-2.9L6.4 7l.6-.6-2.9-2.9z'></path>
            </svg>
          </div>
          <div className='item-image' onClick={showProductModal}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
              width={150}
              height={150}
              alt=''
              quality={75}
            />
            <div className='item-image-mask'></div>
          </div>
        </div>
      </div>
      <CartItemInfo product={product} showProductModal={showProductModal} />

      <style jsx>{`
        .cart-item {
          padding: 3rem 0 5rem;
          position: relative;
          z-index: 7;
          border-bottom: 1px solid #e0e3e6;
          display: flex;
          user-select: none;
        }

        @keyframes modified {
          0% {
            background: #87cefa;
          }

          100% {
            background: #fff;
          }
        }

        .focused::after {
          position: absolute;
          background: #fff;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          display: block;
          width: 100%;
          transform: scaleX(2);
          height: 100%;
          content: '';
          opacity: 0.2;
          z-index: -1;
          animation: modified 1s ease;
          animation-delay: 250ms;
        }

        .cart-item:first-child {
          padding-top: 0;
        }

        .cart-left {
          padding-bottom: 2rem;
          margin-right: 2rem;
        }

        .item-image {
          position: relative;
          padding: 11px;
          background: #fff;
          border: 1px solid #e2e7ec;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          width: 120px;
          height: 144px;
          cursor: pointer;
        }
        .item-remove {
          transition: 0.25s filter ease;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 23px;
          height: 23px;
          left: -8px;
          top: -8px;
          border-radius: 50%;
          border: 1px solid #9ca4ab;
          background: #fff;
          cursor: pointer;
          z-index: 6;
        }
        .item-remove:hover {
          filter: brightness(0.9);
        }
        .item-wrapper {
          position: relative;
        }
        .item-remove:hover .item-image-mask {
          pointer-events: none;
        }
        .item-remove svg {
          width: 7px;
          height: 7px;
        }

        .item-image-mask {
          transition: opacity 0.25s ease;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: #333;
          opacity: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
          border-radius: 10px;
        }
        .item-image-mask:hover {
          opacity: 0.1;
        }

        @media (max-width: 340px) {
          .cart-item {
            flex-direction: column;
            padding-bottom: 7rem;
            align-items: center;
            text-align: center;
          }

          .item-image {
            width: auto;
            height: auto;
          }

          .cart-left {
            margin-right: 0;
            width: 100%;
          }

          .product-image {
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default memo(CartItem)
