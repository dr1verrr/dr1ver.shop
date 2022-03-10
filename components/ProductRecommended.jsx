import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RECOMMENDED_PRODUCT_MODAL_SHOW } from '../redux/types'
import ProductPrice from './Product/ProductPrice'
import RecommendedProductModal from './Product/RecommendedProductModal'

export default function ProductRecommended({ categories, productSlug }) {
  const [toTranslate, setTranslate] = useState(0)
  const [page, setPage] = useState(1)
  const isLastPage = categories[0].length - 1 == page
  const dispatch = useDispatch()
  const productModal = useSelector(state => state.ui.recommendedProductModal)

  const showProductModal = slug => {
    dispatch({ type: RECOMMENDED_PRODUCT_MODAL_SHOW, payload: slug })
  }

  useEffect(() => {
    if (categories[0].length >= 5) {
      setPage(5)
    }

    if (categories[0].length < 5) {
      setPage(categories[0].length - 1)
    }
  }, [])

  const arrowHandler = side => {
    if (side === 'left' && page - 1 > 0) {
      setTranslate(prev => prev + 150)
      setPage(prev => prev - 1)
    }
    if (side === 'right' && page !== categories[0].length - 1) {
      setPage(prev => prev + 1)
      setTranslate(prev => prev - 150)
    }
  }

  return (
    <div className='recommended'>
      {productModal.visible && <RecommendedProductModal slug={productModal.slug} />}
      <div className='recommended-title'>
        <span>recommended to</span> <span>purchase</span>
      </div>
      <div className='recommended-products-wrapper'>
        <div className='icon product-recs-arrow-left icon__animated' onClick={() => arrowHandler('left')}>
          <svg className='arrow3' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 0l12.5 12.5L0 25h5.5L18 12.5 5.5 0z'></path>
          </svg>
        </div>

        <div className='icon product-recs-arrow-right icon__animated' onClick={() => arrowHandler('right')}>
          <svg className='arrow3' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 0l12.5 12.5L0 25h5.5L18 12.5 5.5 0z'></path>
          </svg>
        </div>
        <div className='recommended-product-list-wrapper'>
          <div className='recommended-product-list'>
            {categories?.map(cat =>
              cat
                .filter(p => productSlug !== p.slug)
                .map(product => (
                  <div key={product.id} className='recommended-product' onClick={() => showProductModal(product.slug)}>
                    <div className='product-image'>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                        width={120}
                        height={120}
                        quality={65}
                        alt=''
                      />
                    </div>
                    <div className='product-price'>
                      <div className='product-price-inner'>
                        <ProductPrice price={product.price} isDuplicated={true} />
                      </div>
                    </div>
                    <div className='product-title'>{product.title}</div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .recommended {
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
          padding-bottom: 10rem;
          min-height: 455.5px;
        }

        .recommended span:nth-child(2) {
          color: #000;
          background: #fff;
          padding: 1rem 2rem;
          margin-left: 1rem;
        }

        .recommended-products-wrapper {
          position: relative;
        }

        .product-recs-arrow-right,
        .product-recs-arrow-left {
          padding: 10px;
          cursor: pointer;
          position: absolute;
          top: 50%;
          z-index: 500;
        }

        .product-recs-arrow-right {
          right: 0;
          transform: rotate(360deg);
          display: ${isLastPage ? 'none' : 'block'};
        }

        .product-recs-arrow-left {
          left: 0;
          transform: rotate(-180deg);
          display: ${toTranslate == 0 ? 'none' : 'block'};
        }

        .arrow3 {
          font-size: 15px;
          letter-spacing: 0.07em;
          line-height: 1.5;
          color: #fff;
          cursor: pointer;
          width: 18px;
          height: 25px;
          fill: #fff;
          transition: opacity 0.25s ease;
        }

        .arrow3:hover {
          opacity: 0.6;
        }

        .product-price-inner {
          transform: scale(0.6);
        }

        .product-title {
          font-size: 1.4rem;
        }
        .recommended-product {
          cursor: pointer;
          transition: opacity 0.25s ease;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .recommended-product:hover {
          opacity: 0.5;
        }

        .recommended-product-list-wrapper {
          overflow: hidden;
          display: flex;
          justify-content: center;
          margin: 0 5rem;
        }
        .recommended-product-list {
          transition: transform 1s cubic-bezier(0.15, 0.6, 0.2, 1);
          position: relative;
          display: flex;
          align-items: center;
          padding: 5rem 0;
          transform: translateX(${`${toTranslate}px`});
          max-width: 750px;
        }

        .recommended-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          text-transform: uppercase;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 500;
          cursor: default;
        }

        @media (max-width: 920px) {
          .recommended-product-list {
            max-width: 600px;
          }
        }

        @media (max-width: 744px) {
          .recommended-product-list {
            max-width: 450px;
          }
        }

        @media (max-width: 630px) {
          .recommended {
            padding-top: 5rem;
          }
        }

        @media (max-width: 590px) {
          .recommended-product-list {
            max-width: 300px;
          }
        }
        @media (max-width: 420px) {
          .recommended-product-list {
            max-width: 150px;
          }
        }
      `}</style>
    </div>
  )
}
