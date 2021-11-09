import fetch from 'isomorphic-fetch'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useRef } from 'react'

export default function Product({ product }) {
  const router = useRouter()
  const selectRef = useRef()

  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    <>
      <NextNProgress />
      {product && (
        <div className='container'>
          <div className='product'>
            <div className='product-header'>
              <div onClick={() => router.back()} className='product-redirect'>
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
                <button className='product-info-price'>{product.price + ' USD'}</button>
                <p className='product-info-description'>{product.description}</p>
                {product.Custom_field.map(fld => {
                  const select = fld.options.split('|')

                  return (
                    <div key={fld.id} className='product-info-sizes'>
                      <div style={{ color: '#636573', fontWeight: '600' }}>{fld.title}:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1.5rem' }}>
                        {select.map(s => {
                          return (
                            <input
                              type='text'
                              value={s}
                              onClick={() => (selectRef.current.style.backgroundColor = '#fff')}
                              readOnly
                              ref={selectRef}
                              style={{
                                cursor: 'pointer',
                                borderStyle: 'none',
                                background: 'transparent',
                                color: '#fff',
                                background: '#636573',
                                borderRadius: '3rem',
                                padding: '1rem',
                              }}
                              key={s}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
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

        .product-info-sizes {
          padding: 1.5rem 0;
        }
        .product-inner {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        }
        .product-info {
          padding: 0 1.5rem;
          flex: 1;
          font-size: 1.7rem;
        }
        .product-info-price {
          background-color: #fff;
          color: #000;
          padding: 1rem 4rem;
          font-weight: bold;
          font-size: 2.5rem;
          border-radius: 3rem;
          max-width: fit-content;
          border: none;
        }

        .product-title {
          font-size: 4rem;
          text-align: center;
        }
        .product-redirect {
          cursor: pointer;
          flex: 0.45;
          padding: 1.5rem 2rem;
          position: relative;
        }
        .product-image {
          position: relative;
          align-self: flex-start;
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
          max-width: 1200px;
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
