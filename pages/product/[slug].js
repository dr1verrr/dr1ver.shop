import fetch from 'isomorphic-fetch'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useState } from 'react'

export default function Product({ product }) {
  const router = useRouter()
  const [selected, setSelected] = useState('')
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(1)
  const [price] = useState(product.price)
  const [optionPrice, setOptionPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(price)

  useEffect(() => {
    console.log(product)
  }, [product])

  useEffect(() => {
    console.log(selected)
  }, [selected])

  function addToCart() {
    setTotalPrice(price + optionPrice)
  }

  useEffect(() => {
    console.log(totalPrice)
  }, [totalPrice])

  return (
    <>
      <NextNProgress />
      {product && (
        <div className='container'>
          <div className='product'>
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
                  {parseFloat(product.price + optionPrice)}
                </button>
                <p className='product-info-description'>{product.description}</p>
                {product.Custom_field.map(fld => {
                  const select = fld.options.split('|')

                  return (
                    <div key={fld.id} className='product-info-sizes'>
                      <div style={{ color: '#636573', fontWeight: '600' }}>{fld.title}:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1.5rem' }}>
                        {select.map(s => {
                          const price = parseFloat(s.match(/\[*(\d+.\d+)\]/)[1])
                          const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')

                          return (
                            <input
                              type='button'
                              key={s}
                              className='product-info-sizes-input'
                              active={active && selected === option ? 'true' : 'false'}
                              value={option}
                              onClick={e => {
                                setSelected(e.target.value)
                                setActive(true)
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
                      type='text'
                      value={count}
                      className='product-info-count-input'
                      onChange={e =>
                        e.target.value <= 20 && e.target.value > 0 && setCount(e.target.value.replace(/\D/g, ''))
                      }
                    />
                    <button
                      className='product-info-count-counter-plus button-counter'
                      type='button'
                      onClick={() =>
                        setCount(prev => {
                          const value = prev + 1
                          if (value <= 20) {
                            return value
                          } else {
                            return prev
                          }
                        })
                      }
                    >
                      <svg xmlns='http://www.w3.org/2000/svg'>
                        <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <button type='button' className='product-info-add-to-cart' onClick={addToCart}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        body {
          background-color: #1d1f21;
          color: #1d1f21;
          transition: all 0.5s ease;
        }
        body {
          color: #fff;
        }
      `}</style>

      <style jsx>{`
        .product {
          padding: 1.5rem;
        }

        @media (max-width: 870px) {
          .product-inner {
            flex-direction: column;
          }
        }

        @media (max-width: 460px) {
          .product-info-description {
            font-size: 1.6rem !important;
          }

          .product {
            padding: 1.5rem 0 !important;
          }

          .container {
            padding: 1rem !important;
          }
        }

        .product-info-add-to-cart {
          transition: filter 0.3s ease;
          background-color: #fff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-radius: 3rem;
        }

        .product-info-add-to-cart:hover {
          filter: brightness(80%);
        }

        .product-info-count-counter {
          display: flex;
          max-width: fit-content;
          border-radius: 3rem;
          border: 2px solid #fff;
        }

        .product-info-count-title {
          color: #636573;
          padding: 1rem 0;
          font-weight: 600;
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
        }

        .product-info-count {
          margin: 2rem 2rem 2rem 0;
        }

        button {
          outline: none;
          background-color: transparent;
          padding: 1.7rem;
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
          color: #797b8c;
          transition: all 0.2s ease;
          transition-property: color, background-color;
          cursor: pointer;
          border-style: none;
          background: #474852;
          border-radius: 3rem;
          padding: 1rem 2rem;
          margin-right: 0.25rem;
        }

        .product-info-sizes-input:last-child {
          margin-right: 0;
        }
        .product-info-description {
          font-size: 1.8rem;
          min-width: 225px;
        }

        .product-info-sizes {
          padding: 1.5rem 0;
        }
        .product-inner {
          display: flex;
          flex-wrap: wrap;
          gap: 4rem;
        }
        .product-info {
          flex: 1;
          font-size: 1.7rem;
        }
        .product-info-price {
          background-color: #fff;
          color: #1d1f21;
          padding: 1rem 4rem;
          font-weight: 600;
          font-size: 2.5rem;
          border-radius: 3rem;
          max-width: fit-content;
          border: none;
          white-space: nowrap;
          cursor: default;
        }

        .product-title {
          font-size: 4rem;
        }
        .product-redirect {
          cursor: pointer;
          flex: 0.49;
          padding: 1.5rem 2rem;
          position: relative;
        }
        .product-image {
          position: relative;
          align-items: flex-start;
          display: flex;
          justify-content: center;
          flex: 1;
        }
        .product-redirect:hover {
          text-decoration: underline;
        }
        .product-redirect::before,
        .product-redirect::after {
          content: '';
          position: absolute;
          left: 0;
          width: 13px;
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
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 3rem 0;
          flex-wrap: wrap;
          white-space: nowrap;
        }

        .container {
          margin: 0 auto;
          max-width: 91vw;
          padding: 0 1.5rem;
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