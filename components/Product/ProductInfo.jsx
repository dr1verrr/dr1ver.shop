/* eslint-disable react/display-name */
import Link from 'next/link'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useProductInfo } from '../../providers/ProductProvider'
import { RECOMMENDED_PRODUCT_MODAL_HIDE } from '../../redux/types'
import AddToCartBtn from './AddToCartBtn'
import ProductCounter from './ProductCount'
import ProductOption from './ProductOption'
import ProductPrice from './ProductPrice'

const ProductInfo = memo(({ info: { Custom_field, description, categories, id, title, slug, price } }) => {
  const {
    productInfo: { optionPrice, selected, count },
    type,
    actionType,
  } = useProductInfo()

  const dispatch = useDispatch()

  return (
    <div className='product-info'>
      {type === 'productModal' && (
        <h2
          className='product-title'
          style={{ color: '#000', padding: '0 0 1rem', fontSize: '2.4rem' }}
          onClick={() => dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })}
        >
          <Link href={`/product/${slug}?name=${title}`}>{title}</Link>
        </h2>
      )}
      <ProductPrice price={price} optionPrice={optionPrice} type={type} />
      <div className='product-categories'>
        {categories?.map(ctg => (
          <Link key={ctg.slug} href={`/category/${ctg.slug}?name=${ctg.name}`} passHref>
            <a className='product-category' onClick={() => dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })}>
              {ctg.name}
            </a>
          </Link>
        ))}
      </div>
      <p className='product-description'>{description}</p>
      {Custom_field?.map(fld => (
        <ProductOption key={fld} fld={fld} option={{ selected }} type={type} id={id} actionType={actionType} />
      ))}

      <ProductCounter count={count} type={type} actionType={actionType} />
      <AddToCartBtn type={type} />

      <style jsx>{`
        .product-info {
          width: 100%;
          flex: 1;
        }

        .product-description {
          min-width: 225px;
          font-weight: 300;
          text-align: left;
          margin: 1.5rem 0;
        }

        .product-categories {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 2rem;
          font-size: 1.4rem;
          flex-wrap: wrap;
          width: 100%;
        }
        .product-category {
          transition: opacity 0.25s;
          cursor: pointer;
          font-weight: 500;
          padding: 0.2rem 1rem;
          border-radius: 30px;
          background: #ccc;
          color: #000;
          max-width: fit-content;
          text-align: center;
        }

        .product-category:hover {
          opacity: 0.75;
        }

        button {
          outline: none;
          background: transparent;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }

        .icon .arrow {
          width: 12px;
          height: 7px;
        }

        .product-add-arrow {
          margin-left: 12px;
        }

        @media (max-width: 720px) {
          .product-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .product-description {
            min-width: 0;
            max-width: fit-content;
          }

          .product-categories {
            justify-content: center;
          }
        }

        @media (max-width: 920px) {
          .product-description {
            font-size: calc(1.4rem + 0.35vw);
            line-height: 1.75em;
          }
        }

        @media (max-width: 460px) {
          .container {
            padding: 0.6rem;
          }

          .product-description {
            font-size: calc(1.5rem + 0.3vw);
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
