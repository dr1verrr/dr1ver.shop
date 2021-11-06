import Image from 'next/image'
import React from 'react'
import { ContainerStyled } from './Container.styled'

export default function Product({ products }) {
  return (
    <ContainerStyled>
      <div className='container'>
        {products?.map(product => {
          return (
            <div className='product' key={product.id}>
              <div className='product-price'>{product.price + ' USD'}</div>
              <div className='product-image'>
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`} width={200} height={200} alt='' />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h2 style={{ margin: 0 }} className='product-title'>
                  {product.title}
                </h2>
                <p className='product-description'>{product.description}</p>
              </div>
              <a href={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`} className='product-link'></a>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 3rem;
          padding-bottom: 5rem;
        }
        .product-price {
          z-index: 5;
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 0;
          padding: 1rem 2rem;
          color: #fff;
          font-weight: bold;
          background-color: #1d1f21;
          border-top-left-radius: 2rem;
          border-bottom-right-radius: 2rem;
          font-size: 2rem;
        }
        @media (max-width: 1140px) {
          .container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 710px) {
          .container {
            grid-template-columns: 1fr;
          }
        }
        .product {
          transition: all 1s ease !important;
          display: flex;
          flex-direction: column;
          border-radius: 3rem;
          background-color: #fff;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(0, 60, 120, 0.06));
          padding: 3rem;
          text-align: left;
        }
        .product-image {
          align-self: center;
          margin-top: 5rem;
        }
        .product-link {
          transition: opacity 0.25s ease !important;
          opacity: 0;
          display: none;
          cursor: pointer;
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
          opacity: 0.55;
        }
      `}</style>
    </ContainerStyled>
  )
}
