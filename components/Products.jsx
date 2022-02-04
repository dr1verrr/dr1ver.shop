import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Products({ products }) {
  return (
    <div className='container'>
      <div className='product-wrapper'>
        {products?.map(product => {
          return (
            <div className='product' key={product.id}>
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
              <div style={{ padding: '1.5rem' }}>
                <div className='product-title'>{product.title}</div>
                <p className='product-description'>{product.description}</p>
              </div>
              <Link href={`/product/${product.slug}`}>
                <a className='product-link'></a>
              </Link>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .product-wrapper {
          grid-auto-rows: minmax(min-content, max-content);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 3rem;
          padding-bottom: 2rem;
          min-height: 100vh;
        }

        .product-description {
          font-size: 1.9rem;
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
          padding: 0.5rem 2rem;
          color: #fff;
          font-size: 2.2rem;
          font-weight: 600;
          background-color: #1d1f21;
          border-top-left-radius: 20px;
          border-bottom-right-radius: 20px;
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
          .product-wrapper {
          }

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

        @media (max-width: 340px) {
          .product {
            padding: 1.5rem !important;
          }
        }

        @media (max-width: 400px) {
          .product-description {
            font-size: 1.6rem;
          }
        }

        .product {
          display: flex;
          flex-direction: column;
          border-radius: 3rem;
          background-color: #fff;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(0, 60, 120, 0.06));
          padding: 2.5rem;
          text-align: left;
        }

        .product-image {
          align-self: center;
          margin-top: 5rem;
        }

        .product-link {
          transition: opacity 0.5s ease !important;
          opacity: 0;
          display: none;
          cursor: default;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 3rem;
          width: 100%;
          height: 100%;
        }

        .product:hover .product-link {
          display: block;
          background-color: #333;
        }

        .product-link:hover {
          opacity: 0.45;
        }
      `}</style>
    </div>
  )
}
