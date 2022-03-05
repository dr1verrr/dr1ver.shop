import throttle from 'lodash.throttle'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { CART_REMOVE, CART_UPDATE, MODAL_SHOW, PRODUCT_MODAL_SHOW } from '../../redux/types'

const CartItem = ({ product }) => {
  const dispatch = useDispatch()
  const showProductModal = () => dispatch({ type: PRODUCT_MODAL_SHOW, payload: product.slug })

  const updateProduct = (e, count) => {
    throttle(() => {
      if (e.target.name) {
        dispatch({ type: CART_UPDATE, payload: { ...product, [e.target.name]: e.target.value } })
      } else {
        if (count > 0 && count <= 99) {
          console.log(count)
          dispatch({ type: CART_UPDATE, payload: { ...product, count } })
        }
      }
    }, 2000)
  }

  const removeProduct = () => {
    dispatch({ type: CART_REMOVE, payload: product })
    dispatch({ type: MODAL_SHOW, payload: 'Product was removed from the basket.' })
  }

  return (
    <div className='cart-item'>
      <div className='cart-left'>
        <div className='product-wrapper'>
          <div className='product-remove' onClick={removeProduct}>
            <svg xmlns='http://www.w3.org/2000/svg'>
              <path d='M7 .6L6.4 0 3.5 2.9.6 0 0 .6l2.9 2.9L0 6.4l.6.6 2.9-2.9L6.4 7l.6-.6-2.9-2.9z'></path>
            </svg>
          </div>
          <div className='product-image' onClick={showProductModal}>
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`} width={150} height={150} alt='' />
            <div className='product-image-mask'></div>
          </div>
        </div>
      </div>
      <div className='cart-right'>
        <div className='product-cart-price'>{(product.count * product.price).toFixed(2)} USD</div>
        <div className='product-title' onClick={showProductModal}>
          {product.name}
        </div>
        <div className='product-options'>
          {product?.Custom_Field.map(fld => {
            const select = fld.options.split('|')
            return (
              <div key={fld.id} className='product-info-sizes'>
                <div style={{ color: '#818d92', fontWeight: '400', fontSize: '1.5rem' }}>Size: </div>
                <div className='product-info-sizes-inner'>
                  {select.map(s => {
                    const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
                    /// value = option

                    return (
                      <input
                        type='button'
                        key={s}
                        className='product-info-sizes-input'
                        active={product.options === option ? 'true' : 'false'}
                        value={option}
                        onClick={updateProduct}
                        name='options'
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className='product-count'>
          <div className='count-title'>Count: </div>
          <div className='product-info-count-counter'>
            <button type='button' className='product-info-count-counter-minus button-counter'>
              <svg className='counter-icon' xmlns='http://www.w3.org/2000/svg'>
                <path d='M9 4v1H0V4z'></path>
              </svg>
            </button>
            <input type='number' className='product-info-count-input' value={product.count} />
            <button type='button' className='product-info-count-counter-plus button-counter'>
              <svg className='counter-icon' xmlns='http://www.w3.org/2000/svg'>
                <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
              </svg>
            </button>
          </div>
          {/*<div className='counter'>
            <input
              type='number'
              className='counter-input'
              value={product.count}
              onChange={updateProduct}
              name='count'
            />
            <div className='counter-control'>
              <button
                type='button'
                className='modal__cart-product-count-plus'
                onClick={e => updateProduct(e, product.count + 1)}
              >
                <div className='icon icon__animated'>
                  <svg className='plus' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
                  </svg>
                </div>
              </button>
              <button
                type='button'
                className='modal__cart-product-count-minus'
                onClick={e => updateProduct(e, product.count - 1)}
              >
                <div className='icon icon__animated'>
                  <svg className='minus' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M9 4v1H0V4z'></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>*/}
        </div>
      </div>
      <style jsx>{`
        .cart-item {
          padding: 3rem 0 5rem;
          border-bottom: 1px solid #e0e3e6;
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        .product-info-count-counter {
          display: flex;
          max-width: fit-content;
          border-radius: 3rem;
          border: 2px solid #e2e7ec;
          margin-bottom: 1.5rem;
        }

        .product-info-count-input {
          box-sizing: border-box;
          width: 5rem;
          text-align: center;

          outline: none;
          border: none;
          background: #e2e7ec;
          color: #333;
          font-size: 1.6rem;
        }

        .counter-icon {
          fill: #000;
          height: 9px;
          width: 9px;
        }

        .product-options {
          margin-bottom: 2rem;
        }
        .cart-item:first-child {
          padding-top: 0;
        }
        .cart-left {
          padding-bottom: 2rem;
          flex: 0 0 100%;
          height: 100%;
        }
        button[type='button'] {
          background: none;
          border: none;
        }
        .product-cart-price {
          position: absolute;

          right: 30px;
          bottom: -30px;
        }
        .modal__cart-product-count-plus {
          margin-right: 2.5px;
        }
        .icon svg {
          height: 10px;
          width: 10px;
        }

        .product-title {
          transition: 0.25s color ease;
          color: rgba(0, 0, 0, 1);
          font-size: 2rem;
          cursor: pointer;
          width: fit-content;
          padding-bottom: 1rem;
        }
        .product-title:hover {
          color: rgba(0, 0, 0, 0.6);
        }
        .count-title {
          font-size: 1.5rem;
          color: #929da1;
        }

        input[active='true'] {
          transition: color 0.2s ease;

          color: #000;
          background: #fff;
          border: 2px solid rgba(0, 200, 200, 0.3);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
            0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
        }

        input[active='true']:hover {
          filter: none;
          color: #999;
        }
        .product-info-sizes-input {
          transition: filter 0.25s ease;
          cursor: pointer;
          font-size: 1.5rem;
          background: #e2e7ec;
          border-radius: 3rem;
          border: 1px solid #dcdcdc;
          padding: 0.5rem 1rem;
          color: #333;
        }

        .product-info-sizes-input:hover {
          filter: brightness(0.9);
        }

        .product-info-sizes-inner {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 100%;
          gap: 1rem;
          padding-top: 0.75rem;
        }
        input {
          border: none;
          background-image: none;
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
        .cart-right {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .product-image {
          position: relative;
          padding: 11px;
          background: #fff;
          border: 1px solid #e2e7ec;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          cursor: pointer;
        }
        .product-remove {
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
        .product-remove:hover {
          filter: brightness(0.9);
        }
        .product-wrapper {
          position: relative;
        }
        .product-remove:hover .product-image-mask {
          pointer-events: none;
        }
        .product-remove svg {
          width: 7px;
          height: 7px;
        }
        .product-image-mask {
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
        .product-image-mask:hover {
          opacity: 0.1;
        }

        .button-counter {
          transition: 0.25s background ease, 0.25s filter ease;
          box-sizing: border-box;
          outline: none;
          background-color: #fff;
          padding: 1rem 2rem;
          border: none;
          cursor: pointer;
          border-radius: 3rem 0 0 3rem;
        }

        .button-counter:hover {
          background-color: #f2f3f4;
        }

        .product-info-count-counter-plus {
          border: none;
          border-radius: 0 3rem 3rem 0;
        }

        @media (max-width: 420px) {
          .product-count {
            margin-bottom: 2rem;
          }
        }
        @media (max-width: 340px) {
          .product-info-sizes-inner {
            margin-bottom: 1rem;
          }
          .cart-item {
            padding-bottom: 7rem;
          }
          .product-cart-price {
            bottom: -35px;
          }
        }
        @media (max-width: 320px) {
        }
      `}</style>
    </div>
  )
}

export default CartItem
