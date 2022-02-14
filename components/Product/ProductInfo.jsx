import React from 'react'
import ProductButton from '../ProductButton'
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
      <div className='product-button-wrapper'>
        <ProductButton>Add to cart</ProductButton>
      </div>
      <style jsx>{`
        .product-info {
          flex: 1;
        }

        .product-info-description {
          font-size: 2rem;
          min-width: 225px;
          word-break: break-word;
        }

        .product-info {
          flex: 1;
        }

        .product-button-wrapper {
          white-space: nowrap;
        }

        button {
          outline: none;
          background-color: transparent;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }

        .icon .arrow {
          width: 12px;
          height: 7px;
        }

        .product-info-add-to-cart-arrow {
          margin-left: 12px;
        }

        @media (max-width: 460px) {
          .product-info-description {
            line-height: 1.5;
          }

          .container {
            padding: 0.6rem;
          }
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
      `}</style>
    </div>
  )
}

export default ProductInfo
