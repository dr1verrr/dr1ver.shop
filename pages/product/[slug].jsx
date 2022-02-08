/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import fetch from 'isomorphic-fetch'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '../../contexts/cart'
import { useLayout } from '../../contexts/layout'

export default function Product({ product }) {
  const router = useRouter()
  const [selected, setSelected] = useState('')
  const [active] = useState(true)
  const [count, setCount] = useState(1)
  const [price] = useState(product.price)
  const [optionPrice, setOptionPrice] = useState(0)
  const { cartVisible, setCartVisible, showModal, setShowModal } = useLayout()
  const { cartData, setCartData, setLastModified } = useCart()

  const [loading, setLoading] = useState(true)
  const inputCountRef = useRef(null)

  useEffect(() => {
    if (product) setLoading(false)
  }, [product])

  useEffect(() => {
    const listener = document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setShowModal(prev => ({ ...prev, visible: false }))
      }

      if (e.key === 'Enter' && document.activeElement === inputCountRef.current) {
        setShowModal(prev => ({ ...prev, visible: false }))
      }
    })

    return listener
  }, [])

  function addToCart(arr, obj) {
    let newArr = []
    let flag = false
    const isExist = index => arr[index].id == obj.id && arr[index].options === obj.options

    if (arr.length) {
      newArr = [...arr]

      for (let index = 0; index < arr.length; index++) {
        if (isExist(index)) {
          newArr[index] = {
            ...obj,
            count: parseInt(arr[index].count + obj.count > 99 ? 99 : arr[index].count + obj.count),
          }
          flag = true
          break
        } else if (index > arr.length) {
          flag = false
        }
      }
    }

    if (!arr.length) newArr = null

    setLastModified({ id: obj.id, options: obj.options })

    if (flag) return newArr

    return [...arr, obj]
  }

  function submitHandler(e) {
    e.preventDefault()

    if (count === '' || count == undefined) {
      setCount(1)
      return
    }

    if (cartVisible) return
    const totalPrice = price + optionPrice

    if (selected) {
      const data = {
        id: product.id,
        name: product.title,
        slug: product.slug,
        price: totalPrice,
        options: selected,
        count,
        image: product.image.url,
        Custom_Field: product.Custom_field,
      }

      if (data) {
        try {
          setCartData(prev => addToCart(prev, data))
        } catch (err) {
          console.error(err)
        } finally {
          setShowModal({ title: '', message: 'The product was added to the shopping cart.', visible: true })
          setCartVisible(true)
        }
      }
    }
  }

  function countHandler(e) {
    const value = parseInt(e.target.value) || ''
    if (value > 20) {
      setCount(20)
      return
    }

    if (value == NaN || value == undefined) {
      setCount(parseInt(''))
      return
    }

    setCount(value)
  }

  return (
    <>
      {!loading ? (
        <div className='product'>
          <div className='container'>
            <form action='' onSubmit={submitHandler}>
              <div className='product-header'>
                <div onClick={router.back} className='product-redirect'>
                  <span>Go back</span>
                </div>
                <div className='product-title'>{product.title}</div>
              </div>
              <div className='product-inner'>
                <div className='product-image'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                    alt=''
                    width={product.image.width}
                    height={product.image.height}
                  />
                </div>
                <div className='product-info'>
                  <button type='button' className='product-info-price'>
                    <span>{parseFloat(product.price + optionPrice)} USD</span>
                  </button>
                  <p className='product-info-description'>{product.description}</p>
                  {product.Custom_field.map(fld => {
                    const select = fld.options.split('|')
                    return (
                      <div key={fld.id} className='product-info-sizes'>
                        <div style={{ color: '#636573', fontWeight: '600', fontSize: '1.7rem' }}>{fld.title}:</div>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            paddingTop: '0.75rem',
                          }}
                        >
                          {select.map(s => {
                            const price = parseFloat(s.match(/\[*(\d+.\d+)\]/)[1])
                            const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
                            if ((selected.trim().length === 0 && option.startsWith('S')) || option.startsWith('s')) {
                              setSelected(option)
                            }
                            return (
                              <input
                                type='button'
                                key={s}
                                className='product-info-sizes-input'
                                active={active && selected === option ? 'true' : 'false'}
                                value={option}
                                onClick={e => {
                                  setSelected(e.target.value)
                                  setOptionPrice(price)
                                }}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                  <div className='product-info-count'>
                    <div className='product-info-count-title'>Count:</div>
                    <div className='product-info-count-counter'>
                      <button
                        className='product-info-count-counter-minus button-counter'
                        type='button'
                        onClick={() =>
                          setCount(prev => {
                            const value = prev - 1
                            if (value > 0) {
                              return value
                            } else {
                              return prev
                            }
                          })
                        }
                      >
                        <svg xmlns='http://www.w3.org/2000/svg'>
                          <path d='M9 4v1H0V4z'></path>
                        </svg>
                      </button>
                      <input
                        type='number'
                        value={count}
                        className='product-info-count-input'
                        onChange={countHandler}
                        ref={inputCountRef}
                      />
                      <button
                        className='product-info-count-counter-plus button-counter'
                        type='button'
                        onClick={() =>
                          setCount(prev => {
                            let value = prev + 1
                            if (value > 20) {
                              return 20
                            }

                            if (value <= 0 || value === '') {
                              return 1
                            }
                            return value
                          })
                        }
                      >
                        <svg xmlns='http://www.w3.org/2000/svg'>
                          <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button type='submit' className='product-info-add-to-cart'>
                    Add to cart
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <style jsx global>
        {`
          body {
            color: #fff;
            transition: background 0.2s ease;
            background: rgba(17, 17, 19, 1);
          }

          .header {
            background: transparent !important;
          }
        `}
      </style>
      <style jsx>{`
        .product {
          background: transparent;
          padding: 0 0.5rem 10rem;
          position: relative;
          min-height: 100vh;
        }

        * {
          overflow: visible;
        }

        .product::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${process.env.NEXT_PUBLIC_API_URL}${product.image.url});
          background-repeat: repeat-x;
          background-size: 50%;
          background-position: top;
          z-index: -1;
          opacity: 0.15;
          filter: blur(2rem);
        }

        @media (max-width: 567px) {
          .product::after {
            background-repeat: repeat-y;
            background-size: 75%;
          }
        }

        .product-info {
          flex: 1;
        }

        button {
        }

        .button-counter svg {
          width: 0.6rem;
          height: 0.6rem;
        }

        .button-counter {
          border-radius: 3rem 0 0 3rem;
          transition: 0.1s background ease;
        }

        .button-counter:last-child {
          border-radius: 0 3rem 3rem 0;
        }

        .button-counter:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 870px) {
        }

        @media (max-width: 460px) {
          .product-info-description {
            line-height: 1.5;
          }

          .container {
            padding: 0.6rem !important;
          }
        }

        .product-info-add-to-cart {
          font-size: 1.6rem;
          transition: filter 0.2s ease, transform 0.2s ease;
          background-color: #fff;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 3rem;
          padding: 1.5rem 5rem;
        }

        .product-info-add-to-cart:active {
          transform: scale(1.09);
        }

        .product-info-add-to-cart:hover {
          filter: brightness(80%);
        }

        .product-info-count-counter {
          display: flex;
          max-width: fit-content;
          border-radius: 3rem;
          border: 2px solid #fff;
          margin-bottom: 1.5rem;
        }

        .product-info-count-title {
          color: #636573;
          padding: 0.5rem 0;
          font-weight: 600;
          font-size: 1.7rem;
        }

        .product-info-count {
          display: inline-block;
        }

        .product-info-count-input {
          width: 5rem;
          text-align: center;
          font-weight: 600;
          outline: none;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-left: 2px solid #fff;
          border-right: 2px solid #fff;
          font-size: 1.6rem;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }

        .product-info-count {
          margin: 1rem 1rem 1rem 0;
        }

        button {
          outline: none;
          background-color: transparent;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }

        svg {
          fill: #fff;
          height: 9px;
          width: 9px;
        }

        .product-info-sizes-input[active='true'] {
          background-color: #fff;
          color: #000;
        }

        .product-info-sizes-input {
          display: block;
          color: #797b8c;
          position: relative;
          transition: all 0.2s ease;
          transition-property: color, background-color, transform, border;
          cursor: pointer;
          border-style: none;
          background: #474852;
          border-radius: 3rem;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          margin-right: 0.5rem;
          font-size: 1.6rem;
          border: 1px solid transparent;
        }

        .product-info-sizes-input[active='false']:hover {
          border: 1px solid #fff;
        }

        .product-info-sizes-input:active {
          transform: scale(1.1);
        }

        .product-info-sizes-input:last-child {
          margin-right: 0;
        }

        .product-info-description {
          font-size: 2rem;
          min-width: 225px;
          word-break: break-word;
        }

        .product-info-sizes {
          padding: 0.75rem 0;
        }

        .product-inner {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }

        @media (max-width: 567px) {
          .product-inner {
            flex-direction: column;
          }

          .product-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .product-info-description {
            font-size: 1.8rem;
            margin-top: 7rem;
          }
        }

        .product-info {
          flex: 1;
        }

        .product-info-price {
          background-color: #fff;
          color: #1d1f21;
          padding: 1rem 3rem;
          font-size: 2.2rem;
          font-weight: 700;
          border-radius: 3rem;
          max-width: fit-content;
          border: none;
          white-space: nowrap;
          cursor: default;
        }

        .product-info-price span {
          cursor: text;
          pointer-events: all;
          user-select: all;
        }

        .product-title {
          font-size: 4rem;
          text-align: center;
          padding-bottom: 3rem;
        }

        @media (max-width: 570px) {
          .product-title {
            padding: 0;
          }
        }

        .product-redirect {
          display: inline-block;
          cursor: pointer;
          padding: 1rem;
          position: relative;
        }

        .product-image {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex: 1;
          min-width: 250px;
        }

        .product-redirect:hover {
          text-decoration: underline;
        }

        .product-redirect::before,
        .product-redirect::after {
          content: '';
          position: absolute;
          left: -0.75rem;
          width: 1.2rem;
          height: 1px;
          top: 50%;
          background-color: #fff;
        }
        .product-redirect::after {
          transform: rotate(45deg);
        }

        .product-redirect::before {
          transform: rotate(135deg);
        }

        .product-header {
          padding: 1rem 0;
          white-space: nowrap;
        }

        .container {
          margin: 0 auto;
          max-width: 91vw;
          padding: 0 1rem;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.slug}`)
  const data = await res.json()

  return {
    props: {
      product: data,
    },
  }
}
