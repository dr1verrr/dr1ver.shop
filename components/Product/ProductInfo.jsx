/* eslint-disable react/display-name */
import Link from 'next/link'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useProductInfo } from '../../providers/ProductProvider'
import { RECOMMENDED_PRODUCT_MODAL_HIDE } from '../../redux/types'
import AddToCartBtn from './AddToCartBtn'
import ProductCounter from './ProductCounter'
import ProductOption from './ProductOption'
import ProductPrice from './ProductPrice'

const ProductInfo = memo(({ info: { Custom_field, description, categories, id } }) => {
  const {
    productInfo: { price, optionPrice, selected, count },
    type,
    actionType,
  } = useProductInfo()

  const dispatch = useDispatch()

  return (
    <div className='product-info'>
      <ProductPrice price={price} optionPrice={optionPrice} type={type} />
      <div className='product-info-categories'>
        {categories?.map(item => (
          <Link key={item.slug} href={`/category/${item.slug}`} passHref>
            <a className='product-info-category' onClick={() => dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })}>
              {item.name}
            </a>
          </Link>
        ))}
      </div>
      <p className='product-info-description'>{description}</p>
      {Custom_field?.map(fld => (
        <ProductOption key={fld} fld={fld} optionSelected={selected} type={type} id={id} actionType={actionType} />
      ))}

      <ProductCounter count={count} type={type} actionType={actionType} />
      <AddToCartBtn type={type} />

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
          align-items: center;
          gap: 1rem;
          padding-top: 2rem;
          font-size: 1.4rem;
          flex-wrap: wrap;
          width: 100%;
        }
        .product-info-category {
          cursor: pointer;
          font-weight: 500;
          padding: 0.2rem 1rem;
          border-radius: 30px;
          background: #ccc;
          color: #000;
          min-width: 15%;
          text-align: center;
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

        @media (max-width: 630px) {
          .product-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .product-info-description {
            margin-top: 3rem;
          }

          .product-info-categories {
            justify-content: center;
          }
        }

        @media (max-width: 920px) {
          .product-info-description {
            font-size: calc(1.3rem + 0.35vw);
          }
        }

        @media (max-width: 460px) {
          .product-info-description {
            line-height: 1.5;
          }

          .container {
            padding: 0.6rem;
          }

          .product-info-description {
            font-size: calc(1.4rem + 0.35vw);
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
