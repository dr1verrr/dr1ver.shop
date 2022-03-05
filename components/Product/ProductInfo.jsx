/* eslint-disable react/display-name */
import React, { memo } from 'react'
import AddToCartBtn from './AddToCartBtn'
import ProductCounter from './ProductCounter'
import ProductOption from './ProductOption'
import ProductPrice from './ProductPrice'
import Link from 'next/link'

const ProductInfo = memo(({ info: { Custom_field, price, description, categories } }) => {
  return (
    <div className='product-info'>
      <ProductPrice price={price} />
      <div className='product-info-categories'>
        {categories?.map(item => (
          <Link key={item.slug} href={`/category/${item.slug}`} passHref>
            <div className='product-info-category'>{item.name}</div>
          </Link>
        ))}
      </div>
      <p className='product-info-description'>{description}</p>
      {Custom_field?.map(fld => (
        <ProductOption key={fld} fld={fld} />
      ))}

      <ProductCounter />
      <AddToCartBtn />

      <style jsx>{`
        .product-info {
          flex: 1;
        }

        .product-info-description {
          min-width: 225px;
          word-break: break-word;
          font-size: 1.8rem;
          font-weight: 300;
        }

        .product-info-categories {
          display: flex;
          gap: 1rem;
          padding-top: 2rem;
          font-size: 1.4rem;
          flex-wrap: wrap;
        }
        .product-info-category {
          cursor: pointer;
          font-weight: 500;
          padding: 0.2rem 1rem;
          border-radius: 30px;
          background: #ccc;
          color: #000;
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

        @media (max-width: 630px) {
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
})

const ProductInfoWrapper = props => {
  return <ProductInfo {...props} />
}

export default ProductInfoWrapper
