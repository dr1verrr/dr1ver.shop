import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductButton from './ProductButton'

function Products({ products }) {
  return (
    <div className='container'>
      <div className='product-wrapper'>
        {products?.map(product => {
          return (
            <Link key={product.id} href='/product/[slug]' as={`/product/${product.slug}`} passHref>
              <div className='product-inner'>
                <div className='product'>
                  <div className='product-price'>{product.price + ' USD'}</div>
                  <div className='product-image'>
                    {product.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                        width={200}
                        height={200}
                        alt=''
                      />
                    ) : (
                      <Image src='https://via.placeholder.com/150' alt='' />
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

      <style jsx>{`
        .product-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 3rem;
          padding-bottom: 10rem;
        }

        .product-button {
          will-change: background-color, color;
          display: block;
          margin-top: 2rem;
          width: 100%;
          text-align: center;
          border: 2px solid #f1f3f5;
          padding: 1.5rem;
          border-radius: 30px;
          transition: background-color 0.4s ease, color 0.4s ease;
          letter-spacing: 2px;
          font-size: 2rem;
          font-weight: 500;
          cursor: pointer;
        }

        .product-button-wrapper {
          will-change: opacity;
          transition: opacity 0.25s ease;
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .product-inner:hover .product-button-wrapper {
          visibility: visible;
          opacity: 1;
        }
        .container {
          position: relative !important;
          margin: 0 auto;
          max-width: 85vw;
          padding: 0 15px;
        }

        .product-price {
          z-index: 5;
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 0;
          padding: 0.75rem 2.5rem 0.75rem 2rem;
          color: #fff;
          font-size: 2.2rem;
          font-weight: 500;
          background-color: #1d1f21;
          border-top-left-radius: 25px;
          border-bottom-right-radius: 25px;
        }

        .product-title {
          font-weight: 700;
          font-size: 2.1rem;
        }

        @media (max-width: 1200px) {
          .product-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 840px) {
          .product-image {
            max-width: 150px;
          }
        }

        @media (max-width: 770px) {
          .product-wrapper {
            grid-template-columns: 1fr;
          }
          .product-image {
            max-width: 100%;
          }
        }

        .product {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 3rem;
          background-color: #fff;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(0, 60, 120, 0.06));
          padding: 2.5rem 2.5rem 9rem;
          text-align: left;
        }

        .product-image {
          align-self: center;
          margin-top: 5rem;
        }

        .product-link {
          will-change: background, opacity, visibility;
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
      `}</style>
    </div>
  )
}

export default Products
