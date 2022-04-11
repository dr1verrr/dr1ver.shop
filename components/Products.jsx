/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { PRODUCT_INCREMENT } from '../constants'
import useThrottle from '../hooks/useThrottle'
import ProductButton from './ProductButton'
import Spinner from './Spinner'

function Products({ slug, ctgName }) {
  const [productsLoading, setProductsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(PRODUCT_INCREMENT)
  const productPage = useRef()
  const [productsInfo, setProductsInfo] = useState({})

  const getProducts = async () => {
    try {
      const res = await axios.get(`/api/category/${slug}`)
      const data = res.data

      setProductsInfo(slug === 'all' ? { products: data } : data)
    } catch (err) {
      console.error(err)
      console.log('Fetching again...')
      getProducts()
    }
  }

  const handleScroll = useThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 250 < productPage.current.offsetHeight ||
      productsLoading
    ) {
      return false
    }

    if (!productsLoading) setProductsLoading(true)
  }, 250)

  useEffect(() => {
    if (!productsLoading || count == productsInfo?.products?.length) return

    setTimeout(() => {
      if (count + PRODUCT_INCREMENT >= productsInfo?.products?.length) {
        setCount(productsInfo?.products?.length)
      } else {
        setCount(count + PRODUCT_INCREMENT)
      }

      setProductsLoading(false)
    }, 150)
  }, [productsLoading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    if (slug) getProducts()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (productsInfo.products) setLoading(false)
  }, [productsInfo])

  return (
    <section className='product-page' ref={productPage}>
      <Head>
        <title>{slug === 'all' ? 'All stickers' : ctgName} — dr1ver.shop</title>
      </Head>
      {loading && (
        <div className='spinner-wrapper spinner-top'>
          <Spinner color='#000' size={42} borderWidth={7} />
        </div>
      )}
      {!loading && (
        <Fragment>
          <h2
            className='product-title'
            style={{
              textAlign: 'center',
              fontWeight: 500,
              padding: '5rem',
              letterSpacing: '2px',
            }}
          >
            {productsInfo.name || 'All stickers'}
          </h2>
          <div className='container'>
            <div className='product-wrapper'>
              {productsInfo?.products.slice(0, count)?.map(product => {
                return (
                  <Link
                    key={product.id}
                    href={{ pathname: `/product/[slug]`, query: { slug: product.slug, name: product.title } }}
                    passHref
                  >
                    <div className='product-inner'>
                      <div className='product'>
                        <div className='product-price'>
                          <span>{product.price}</span>
                          <span>USD</span>
                        </div>
                        <div className='product-image'>
                          {product.image ? (
                            <Image src={product.image.url} layout='fill' objectFit='contain' alt='' />
                          ) : (
                            <Image src='https://via.placeholder.com/200' alt='' layout='fill' />
                          )}
                        </div>
                        <a className='product-link'></a>
                        <div className='product-button-wrapper'>
                          <ProductButton style={{ letterSpacing: '1px', width: '220px', height: '50px' }}>
                            Read more
                          </ProductButton>
                        </div>
                      </div>
                      <button className='product-name'>{product.title}</button>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </Fragment>
      )}
      <div className='spinner-bottom'>
        {productsLoading && count < productsInfo?.products?.length && (
          <Spinner color='#000' size={42} borderWidth={8} />
        )}
      </div>

      <style jsx>{`
        .product-wrapper {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 10rem;
          margin: -35px -17.5px;
        }

        .product-name {
          position: relative;
          display: block;
          margin-top: 2rem;
          text-align: center;
          border: 2px solid #f1f3f5;
          height: 58px;
          border-radius: 30px;
          transition: background 0.4s ease, color 0.4s ease;
          letter-spacing: 2px;
          font-size: 1.8rem;
          cursor: pointer;
          overflow: hidden;
          background: #fff;
          word-break: break-all;
        }

        .spinner-bottom {
          position: absolute;
          bottom: 150px;
          left: calc(50% - 10px);
          transform: translateX(-50%);
        }

        .spinner-wrapper {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 50px;
          left: 0;
          display: flex;
          justify-content: center;
        }

        .product-page {
          position: relative;
          min-height: inherit;
          background: #fafafc;
          opacity: 1;
          padding-bottom: 150px;
        }

        .product-button-wrapper {
          transition: opacity 0.4s ease;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .product-inner {
          cursor: default;
          display: flex;
          flex-direction: column;
        }

        .product-inner:hover .product-button-wrapper {
          visibility: visible;
          opacity: 1;
        }

        .container {
          position: relative;
          margin: 0 auto;
          max-width: 1360px;
          pointer-events: all;
        }
        .product-price {
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 5;
          display: flex;
          flex-wrap: wrap-reverse;
          align-items: center;
          justify-content: center;
          padding: 0.4rem 2.5rem 0.4rem;
          grid-gap: 0.4rem;
          max-width: 85%;
          color: #fff;
          word-break: break-all;
          font-size: 2.4rem;
          font-weight: 500;
          background: #000;
          border-top-left-radius: 25px;
          border-bottom-right-radius: 25px;
        }

        .product-title {
          font-size: 3.8rem;
        }
        .product {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 3rem;
          background: #fff;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(0, 60, 120, 0.06));
          padding: 2.5rem;
          text-align: left;
          width: 430px;
          height: 450px;
        }
        .product-image {
          position: absolute;
          width: 70%;
          height: 60%;
          left: 15%;
          top: 20%;
        }
        .product-link {
          transition: opacity 0.4s ease, visibility 0.4s ease, background 0.4s ease;
          opacity: 0;
          visibility: hidden;
          background: transparent;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 3rem;
          width: 100%;
          height: 100%;
        }

        .product-inner {
          margin: 35px 17.5px;
        }

        .product-inner:hover .product-link {
          visibility: visible;
          background: #000;
          opacity: 0.5;
        }
        .product-inner:hover .product-name {
          background: #000;
          color: #fff;
        }

        @media (max-width: 1600px) {
          .container {
            width: 85vw;
          }

          .product {
            width: calc(28.33333vw - 23.33333px);
            height: calc(29.65116vw - 24.4186px);
          }

          .product-price {
            font-size: calc(1.5814vw - 1.30233px);
          }
        }

        @media (max-width: 1280px) {
          .container {
            width: 895px;
          }

          .product-price {
            font-size: 2.4rem;
          }

          .product {
            width: 430px;
            height: 450px;
          }
        }

        @media (max-width: 1024px) {
          .container {
            width: 87.5vw;
          }

          .product {
            width: calc(43.75vw - 17.5px);
            height: calc(45.78488vw - 18.31395px);
          }

          .product-price {
            font-size: calc(2.44186vw - 0.97674px);
          }
        }

        @media (max-width: 768px) {
          .product-price {
            font-size: 2.4rem;
          }

          .container {
            width: 430px;
          }

          .product {
            height: 450px;
            width: 430px;
          }

          .product-image {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .container {
            width: 90vw;
          }

          .product-price {
            font-size: 5.1vw;
          }

          .product {
            width: 90vw;
            height: 94.18605vw;
          }
        }
      `}</style>
    </section>
  )
}

export default Products
