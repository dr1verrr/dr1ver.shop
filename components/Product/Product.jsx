import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useProductInfo } from '../../providers/ProductProvider'
import { addToCart, overrideModal, showCart, showModal } from '../../redux/actions'
import { PROGRESS_END, PROGRESS_START, RECOMMENDED_PRODUCT_MODAL_HIDE } from '../../redux/types'
import Spinner from '../Spinner'
import ProductInfo from './ProductInfo'

export default function Product({ product, loading }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { type, actionType, productInfo } = useProductInfo()

  useEffect(() => {
    if (!loading) {
      dispatch({ type: actionType, payload: { price: product.price, count: 1, selected: 'Small' } })
    }
  }, [loading])

  const submitHandler = e => {
    e.preventDefault()

    dispatch({ type: PROGRESS_START, payload: { type } })

    const { count, price, optionPrice, selected } = productInfo

    if (count === '' || count == undefined) {
      dispatch({ type: actionType, payload: { count: 1 } })
    }

    //if (isCartVisible) return
    const totalPrice = price + optionPrice

    if (selected) {
      const data = {
        id: product.id,
        name: product.title,
        slug: product.slug,
        price: totalPrice,
        selected,
        optionPrice,
        count: count ? parseInt(count) : 1,
        image: product.image,
        Custom_Field: product.Custom_field,
      }

      if (data) {
        setTimeout(() => {
          dispatch({ type: PROGRESS_END, payload: { type } })
          if (type === 'recommendedModalProduct') {
            dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })
          }
          dispatch(addToCart(data))
            .then(() => dispatch(showCart()))
            .then(() => dispatch(showModal('Product was added to the shopping cart.')))
            .then(() => dispatch(overrideModal()))
        }, 300)
      }
    }
  }

  return (
    <div className='product' type={type}>
      {loading && (
        <div className='spinner-wrapper'>
          <Spinner color={type === 'recommendedProductModal' ? '#000' : '#fff'} borderWidth={8} size={85} />
        </div>
      )}
      {type !== 'recommendedModalProduct' && (
        <div className='product-background'>
          {!loading && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
              layout='fill'
              objectFit='contain'
              quality={1}
              alt=''
            />
          )}
        </div>
      )}
      {!loading && (
        <div className='container'>
          <form action='' onSubmit={submitHandler}>
            {type !== 'recommendedModalProduct' && (
              <div className='product-header'>
                <div onClick={router.back} className='product-redirect'>
                  <span>Go back</span>
                </div>
                <div className='product-title'>{product.title}</div>
              </div>
            )}

            <div className='product-inner'>
              <div className='product-image'>
                {type === 'recommendedModalProduct' ? (
                  <div
                    className='product-image-link'
                    onClick={() => dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })}
                  >
                    <Link href={`/product/${product.slug}`} passHref>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                        alt=''
                        width={product.image.width}
                        height={product.image.height}
                        quality={100}
                      />
                    </Link>
                  </div>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                    alt=''
                    width={product.image.width}
                    height={product.image.height}
                    quality={100}
                  />
                )}
              </div>
              <ProductInfo
                info={{
                  Custom_field: product.Custom_field,
                  price: product.price,
                  description: product.description,
                  categories: product.categories,
                  id: product.id,
                }}
              />
            </div>
          </form>
        </div>
      )}
      <style jsx global>{`
        .product[type='recommendedModalProduct'] .product-info-price {
          border: 1px solid #797b8c;
          background: #fff;
          color: #797b8c;
        }

        .product[type='recommendedModalProduct'] .product-info-description {
          color: #000;
          font-weight: 400;
        }

        .product[type='recommendedModalProduct'] .product-info-label {
          font-size: 1.5rem;
        }

        .product[type='recommendedModalProduct'] .product-info-sizes-input {
          background: #e2e7ec;
          border: none;
        }

        .product[type='recommendedModalProduct'] .product-info-sizes-input[active='false']:hover {
          filter: none;
          opacity: 0.7;
        }

        .product[type='recommendedModalProduct'] .product-info-sizes-input[active='true'] {
          color: #111113;
          background-color: #fff;
          border: 1px solid #797b8c;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
            0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
        }

        .product[type='recommendedModalProduct'] .product-info-add-to-cart {
          color: #797b8c;
          border: 2px solid #e2e7ec;
        }

        .product[type='recommendedModalProduct'] .product-info-count-counter {
          border-color: #e2e7ec;
        }

        .product[type='recommendedModalProduct'] .product-info-count-input {
          background: #e2e7ec;
          color: #797b8c;
        }

        .product[type='recommendedModalProduct'] .spinner .lds-ring div {
          border-color: #797b8c transparent transparent transparent;
        }

        .product[type='recommendedModalProduct'] svg {
          fill: #797b8c;
        }

        @media (max-width: 920px) {
          .product[type='recommendedModalProduct'] .product-info-label {
            font-size: calc(1.3rem + 0.35vw);
          }
        }

        @media (max-width: 460px) {
          .product[type='recommendedModalProduct'] .product-info-label {
            font-size: calc(1.3rem + 0.35vw);
          }
        }
      `}</style>
      <style jsx>{`
        .product {
          transition: transform 0.25s ease;
          color: #fff;
          padding: 0 0.5rem 0;
          position: relative;
          min-height: calc(100vh - 153.75px - 57.5px);
        }

        .product-image-link {
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .product-image-link:hover {
          opacity: 0.7;
        }

        .spinner-wrapper {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 50px;
          left: -30px;
          z-index: 50;
          display: flex;
          justify-content: center;
        }

        .product[type='recommendedModalProduct'] {
          min-height: auto;
        }

        .product[type='recommendedModalProduct'] .product-image {
          min-width: 150px;
        }

        * {
          overflow: visible;
        }

        .product-background {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          opacity: 0.15;
          user-select: none;
          filter: blur(2rem);
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        button {
          outline: none;
          background-color: transparent;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }

        .product-inner {
          display: flex;
          gap: 2rem;
        }

        .product-title {
          font-size: 3.5rem;
          text-align: center;
          padding-bottom: 3rem;
          letter-spacing: 1px;
        }

        .product-redirect {
          display: inline-block;
          cursor: pointer;
          padding: 1rem;
          position: relative;
          font-weight: 300;
          font-size: 1.4rem;
        }

        .product-image {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex: 1;
          min-width: 250px;
          z-index: 10;
        }

        .product-image::before {
          position: absolute;
          content: '';
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 25%;
          height: 25%;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.25;
          box-shadow: inset 0 0 50px #fff, /* inner white */ inset 20px 0 80px #fff,
            /* inner left magenta short */ inset -20px 0 80px #fff, /* inner right cyan short */ inset 20px 0 300px #fff,
            /* inner left magenta broad */ inset -20px 0 300px #fff, /* inner right cyan broad */ 0 0 50px #fff,
            /* outer white */ -10px 0 80px #fff, /* outer left magenta */ 10px 0 80px #fff; /* outer right cyan */
        }

        .product-redirect:hover {
          text-decoration: underline;
        }

        .product-redirect::before,
        .product-redirect::after {
          content: '';
          position: absolute;
          left: -0.75rem;
          width: 1.2rem;
          height: 1px;
          top: 50%;
          background-color: #fff;
        }
        .product-redirect::after {
          transform: rotate(45deg);
        }

        .product-redirect::before {
          transform: rotate(135deg);
        }

        .product-header {
          padding: 1rem 0;
          white-space: nowrap;
        }

        .container {
          margin: 0 auto;
          max-width: 91vw;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1170px) {
          .product {
            min-height: calc(100vh - 232.5px - 25px);
          }
        }

        @media (max-width: 570px) {
          .product-title {
            padding: 0;
          }
        }
        @media (max-width: 630px) {
          .product-inner {
            flex-direction: column;
          }

          .product {
            min-height: calc(100vh - 75px);
          }
        }
      `}</style>
    </div>
  )
}
