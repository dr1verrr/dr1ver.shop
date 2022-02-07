import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '../contexts/cart'
import { useLayout } from '../contexts/layout'

function CartItem({ product, cartVisible }) {
  const [selected, setSelected] = useState('')
  const [active, setActive] = useState(true)
  const productRef = useRef()
  const { setCartData, cartData } = useCart()
  const { setShowModal } = useLayout()

  useEffect(() => {
    setSelected(product.options)
  }, [product])

  function removeProduct() {
    setCartData(arr => arr.filter(item => (product.id == item.id && product.options === item.options ? false : true)))
    setShowModal(() => ({
      title: `${product.name} — ${product.options}`,
      message: 'Product was removed',
      visible: true,
    }))
  }

  function countHandler(e) {}

  if (!cartData.length) return <div>No products in cart</div>

  return (
    <div className='cart-item' ref={productRef}>
      <div className='cart-left'>
        <div className='product-wrapper'>
          <div className='product-remove' onClick={removeProduct}>
            <svg className='' xmlns='http://www.w3.org/2000/svg'>
              <path d='M7 .6L6.4 0 3.5 2.9.6 0 0 .6l2.9 2.9L0 6.4l.6.6 2.9-2.9L6.4 7l.6-.6-2.9-2.9z'></path>
            </svg>
          </div>
          <div className='product-image'>
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`} width={150} height={150} alt='' />
            <Link href={`/product/${product.slug}`} passHref>
              <div className='product-image-mask'></div>
            </Link>
          </div>
        </div>
      </div>
      <div className='cart-right'>
        <div className='product-cart-price'>{(product.count * product.price).toFixed(2)} USD</div>

        <div className='product-title'>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </div>

        <div className='product-options'>
          {product?.Custom_Field.map(fld => {
            const select = fld.options.split('|')
            return (
              <div key={fld.id} className='product-info-sizes'>
                <div style={{ color: '#818d92', fontWeight: '400', fontSize: '1.6rem' }}>Size: </div>
                <div className='product-info-sizes-inner'>
                  {select.map(s => {
                    const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
                    /// value = option
                    return (
                      <input
                        type='button'
                        key={s}
                        className='product-info-sizes-input'
                        active={active && selected === option ? 'true' : 'false'}
                        value={option}
                        onClick={e => {
                          setSelected(e.target.value)
                        }}
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
          <div className='counter'>
            <input type='number' className='counter-input' value={product.count} onChange={countHandler} />
            <div className='counter-control'>
              <button type='button' className='modal__cart-product-count-plus'>
                <div className='icon icon__animated'>
                  <svg className='plus' xmlns='http://www.w3.org/2000/svg' viewBox=''>
                    <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
                  </svg>
                </div>
              </button>
              <button type='button' className='modal__cart-product-count-minus'>
                <div className='icon icon__animated'>
                  <svg className='minus' xmlns='http://www.w3.org/2000/svg' viewBox=''>
                    <path d='M9 4v1H0V4z'></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cart-item {
          padding: 3rem 1.5rem 5rem;
          border-bottom: 1px solid #dcdee0;
          display: flex;
          margin: 0 auto;
          padding-left: 0.5rem;
        }

        .cart-left {
          padding-right: 2rem;
          padding-left: 2rem;
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

        .counter {
          display: flex;
          align-items: center;
        }

        .counter-input {
          -moz-appearance: textfield;
          outline: none;
          padding: 0 20px 0 10px;
          max-width: 50px;
          font-size: 1.5rem;
          border-right: 1px solid #ccc;
        }

        .counter-control {
          position: relative;
          padding: 0 10px;
          flex: 1;
        }

        .product-title {
          color: rgba(0, 0, 0, 1);
          transition: 0.25s color ease;
          font-weight: 600;
          font-size: 1.8rem;
        }

        .product-title:hover {
          color: rgba(0, 0, 0, 0.6);
        }
        .count-title {
          font-size: 1.6rem;
          color: #929da1;
        }

        input[active='false']:first-child {
          padding-left: 0;
        }

        input[active='false'] {
          padding-top: 5px;
          padding-bottom: 5px;
        }

        input[active='true'] {
          color: #000;
          padding: 0 5px;
          border-right: 1px solid #ccc;
          border-left: 1px solid #ccc;
          font-weight: bold;
          margin-top: 2.5px;
        }

        .product-info-sizes-input {
          cursor: pointer;
          font-size: 1.5rem;
          padding: 0 0.5rem;
        }

        .product-info-sizes-inner {
          display: flex;
          flex-wrap: wrap;
          padding-top: 0.75rem;
          width: calc(100% + 7px);
        }

        @media (max-width: 340px) {
          .product-info-sizes-inner {
            flex-direction: column;
            margin-bottom: 1rem;
          }

          .product-info-sizes-input {
            padding: 0.5rem 0 !important;
          }
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

        @media (max-width: 340px) {
          .cart-item {
            padding-bottom: 7rem;
          }

          .product-cart-price {
            bottom: -35px;
          }
        }

        .product-image {
          position: relative;
          width: 120px;
          padding: 11px;
          background: #fff;
          border: 1px solid #e2e7ec;
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
          transition: all 0.5s;
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
          transition: all 0.25s ease;
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
      `}</style>
    </div>
  )
}

export default CartItem
