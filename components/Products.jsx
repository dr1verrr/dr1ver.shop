/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { PRODUCT_INCREMENT } from '../constants'
import useDebouncedFunction from '../hooks/useDebouncedFunction'
import Link from 'next/link'
import ProductButton from './ProductButton'
import axios from 'axios'
import api from '../config/api'
import Spinner from './Spinner'

function Products({ slug }) {
  const [productsLoading, setProductsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(PRODUCT_INCREMENT)
  const productPage = useRef()
  const [productsInfo, setProductsInfo] = useState({})

  const getProducts = async url => {
    const res = await axios.get(url)

    return res.data
  }

  const getAllProducts = async url => {
    const response = await api.get(url).then(res => res.data)

    return response
  }

  const handleScroll = useDebouncedFunction(() => {
    if (window.innerHeight + document.documentElement.scrollTop < productPage.current.offsetHeight || productsLoading) {
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
    }, 250)
  }, [productsLoading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    if (slug !== 'all') {
      getProducts(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`).then(i => setProductsInfo(i))
    } else {
      getAllProducts('/products').then(ps => setProductsInfo({ products: ps }))
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (productsInfo.products) setLoading(false)
  }, [productsInfo])

  return (
    <div className='product-page' ref={productPage}>
      {loading && (
        <div className='spinner-wrapper spinner-top'>
          <Spinner color='#000' size={85} borderWidth={8} />
        </div>
      )}
      {!loading && (
        <Fragment>
          <h2
            className='product-title'
            style={{
              textAlign: 'center',
              fontSize: '3.5rem',
              fontWeight: 500,
              padding: '5rem',
              letterSpacing: '2px',
            }}
          >
            {productsInfo.name || 'All cards'}
          </h2>
          <div className='container'>
            <div className='product-wrapper'>
              {productsInfo?.products.slice(0, count)?.map(product => {
                return (
                  <Link key={product.id} href={`/product/${product.slug}`} passHref>
                    <div className='product-inner'>
                      <div className='product'>
                        <div className='product-price'>{product.price + ' USD'}</div>
                        <div className='product-image'>
                          {product.image ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                              layout='fill'
                              objectFit='contain'
                              alt=''
                            />
                          ) : (
                            <Image src='https://via.placeholder.com/200' alt='' layout='fill' />
                          )}
                        </div>
                        <a className='product-link'></a>
                        <div className='product-button-wrapper'>
                          <ProductButton>Read more</ProductButton>
                        </div>
                      </div>
                      <span className='product-button'>{product.title}</span>
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
          <Spinner color='#000' size={85} borderWidth={8} />
        )}
      </div>

      <style jsx>{`
        .product-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding-bottom: 10rem;
          grid-gap: 3rem;
          height: 100%;
        }

        .product-button {
          display: block;
          margin-top: 2rem;
          max-width: 100%;
          text-align: center;
          border: 2px solid #f1f3f5;
          padding: 1.5rem;
          border-radius: 30px;
          transition: background-color 0.4s ease, color 0.4s ease;
          letter-spacing: 2px;
          font-size: 1.8rem;
          cursor: pointer;
          white-space: normal;
          word-wrap: break-word;
          overflow: hidden;
        }

        .spinner-bottom {
          position: absolute;
          bottom: 150px;
          left: calc(50% - 40px);
          transform: translateX(-50%);
        }

        .spinner-wrapper {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 50px;
          left: -30px;
          display: flex;
          justify-content: center;
        }

        .product-page {
          position: relative;
          min-height: 100vh;
          background: #fafafc;
          opacity: 1;
          padding-bottom: 150px;
        }

        .product-button-wrapper {
          transition: opacity 0.4s ease;
          opacity: 0;
          visibility: hidden;
          transform: scale(0.5);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          font-size: 1.5rem;
        }
        .product-inner {
          cursor: default;
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
          padding: 0 15px;
        }
        .product-price {
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 5;
          padding: 0.75rem 2.5rem 0.75rem;
          color: #fff;
          font-size: 2.4rem;
          font-weight: 500;
          background-color: #1d1f21;
          border-top-left-radius: 25px;
          border-bottom-right-radius: 25px;
        }
        .product-title {
          font-size: 2.1rem;
        }
        .product {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 3rem;
          background-color: #fff;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(0, 60, 120, 0.06));
          padding: 2.5rem;
          text-align: left;
          height: 450px;
        }
        .product-image {
          position: absolute;
          width: 70%;
          height: 60%;
          left: 15%;
          top: 15%;
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
        .product-inner:hover .product-link {
          visibility: visible;
          background: #000;
          opacity: 0.5;
        }
        .product-inner:hover .product-button {
          background-color: #000;
          color: #fff;
        }

        @media (max-width: 1600px) {
          .container {
            max-width: 85vw;
          }

          .product-price {
            font-size: calc(1.5814vw - 1.30233px);
          }
        }

        @media (max-width: 1280px) {
          .product-price {
            font-size: 2.4rem;
          }
        }

        @media (max-width: 1280px) {
          .product-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .container {
            padding: 0 30px;
          }

          .product {
            height: calc(45.78488vw - 18.31395px);
          }

          .product-price {
            font-size: calc(2.44186vw - 0.97674px);
          }
        }

        @media (max-width: 770px) {
          .product-wrapper {
            grid-template-columns: 1fr;
          }

          .product-price {
            font-size: 2.4rem;
          }

          .product {
            height: 450px;
          }

          .product-wrapper {
            max-width: 450px;
            margin: 0 auto;
          }
          .product-image {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .product-price {
            font-size: 5.1vw;
          }

          .product-button-wrapper {
            transform: translate(-50%, -50%) scale(0.85);
          }

          .product {
            height: 94.18605vw;
          }
        }
      `}</style>
    </div>
  )
}

export default Products
