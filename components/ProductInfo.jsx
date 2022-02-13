import React from 'react'
import ProductCounter from './ProductCounter'
import ProductOption from './ProductOption'
import ProductPrice from './ProductPrice'

function ProductInfo({ info: { Custom_field, price, description } }) {
  return (
    <div className='product-info'>
      <ProductPrice price={price} />
      <p className='product-info-description'>{description}</p>
      {Custom_field?.map(fld => (
        <ProductOption key={fld} fld={fld} />
      ))}

      <ProductCounter />
      <button type='submit' className='product-info-add-to-cart'>
        Add to cart
      </button>
      <style jsx>{`
        .product-info {
          flex: 1;
        }

        button {
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
          font-weight: 500;
        }

        .product-info-add-to-cart:active {
          transform: scale(1.09);
        }

        .product-info-add-to-cart:hover {
          filter: brightness(80%);
        }

        .product-info-description {
          font-size: 2rem;
          min-width: 225px;
          word-break: break-word;
        }

        @media (max-width: 567px) {
          .product-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .product-info-description {
            font-size: 1.8rem;
            margin-top: 3rem;
          }
        }

        .product-info {
          flex: 1;
        }

        button {
          outline: none;
          background-color: transparent;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default ProductInfo
