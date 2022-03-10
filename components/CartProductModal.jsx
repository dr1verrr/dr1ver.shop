import Image from 'next/image'
import { memo, useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useOnClickOutside from '../hooks/useOnClickOutside'
import { CART_HIDE, PRODUCT_MODAL_HIDE } from '../redux/types'
import Link from 'next/link'
import Spinner from './Spinner'

const CartProductModal = memo(({ productModal }) => {
  const dispatch = useDispatch()
  const hideProductModal = () => dispatch({ type: PRODUCT_MODAL_HIDE })
  const hideCart = () => dispatch({ type: CART_HIDE })
  const modalRef = useRef()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const hideModals = () => {
    hideProductModal()
    hideCart()
  }

  useOnClickOutside(modalRef, () => {
    if (productModal.visible) hideProductModal()
  })

  const getProduct = async slug => {
    setLoading(true)
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`)
    const res = await product.json()

    if (product.status == 200) {
      setProduct(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productModal.visible) getProduct(productModal.slug)
  }, [productModal])

  return (
    <div className='product-modal' visible={`${productModal.visible}`}>
      <div className='product-modal-inside'>
        <div className='modal-tile' ref={modalRef}>
          <div className='spinner-wrapper'>{loading && <Spinner color='#000' size={85} />}</div>
          <div className='modal-content'>
            {!loading && (
              <div className='modal-content-inner'>
                {product.image && (
                  <Link href={`/product/${product.slug}`} passHref>
                    <div className='product-image link-hover' onClick={hideModals}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                        alt=''
                        width={300}
                        height={300}
                      />
                    </div>
                  </Link>
                )}

                <div className='product-info'>
                  <div className='product-title link-hover'>
                    <Link href={`/product/${product.slug}`}>
                      <a href='' onClick={hideModals}>
                        {product.title}
                      </a>
                    </Link>
                  </div>
                  <button type='button' className='product-price'>
                    <span className='wrapper'>
                      <span className='price'>{product.price}</span> <span className='currency'>USD</span>
                    </span>
                  </button>
                  <div className='product-description'>{product.description}</div>
                </div>
              </div>
            )}
          </div>
          <div className='icon modal-close' onClick={hideProductModal}>
            <svg className='cross' xmlns='http://www.w3.org/2000/svg' width={15} height={15}>
              <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-modal {
          position: fixed;
          z-index: 2000;
          transition: opacity 0.4s ease;
          opacity: 0;
          background: rgba(0, 0, 0, 0.5);
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          pointer-events: none;
          user-select: none;
        }

        .product-image {
          min-width: 200px;
          max-width: 300px;
          width: 100%;
          cursor: pointer;
        }

        .link-hover {
          transition: opacity 0.25s ease;
        }

        .link-hover:hover {
          opacity: 0.5;
        }

        .product-price {
          background-color: #000;
          color: #fff;
          padding: 1rem 2.5rem;
          font-size: 2.2rem;
          min-width: fit-content;
          margin: 2rem 0;
          white-space: nowrap;
          border-radius: 3rem;
          border: none;
          white-space: nowrap;
          cursor: default;
        }

        .product-description {
          color: #484450;
          font-size: 1.8rem;
          color: #484450;
          word-break: break-word;
        }

        .modal-tile {
          overflow-y: auto;
          min-height: 500px;
          position: relative;
        }

        .spinner-wrapper {
          position: absolute;
          top: 45%;
          transform: translateY(-45%);
          left: calc(50% - 42px);
          z-index: 500;
        }

        .modal-content-inner {
          display: flex;
          grid-gap: 1rem;
        }

        .product-title {
          font-size: 2.5rem;
        }

        .product-modal[visible='true'] {
          opacity: 1;
          pointer-events: all;
        }

        .product-modal-inside {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: auto;
        }

        .modal-tile {
          width: 900px;
          padding: 50px;
          position: relative;
          margin: 5vw 3rem;
          border-radius: 20px;
          background: #fff;
        }

        .modal-close {
          position: absolute;
          right: 15px;
          top: 15px;
          cursor: pointer;
        }

        @media (max-width: 500px) {
          .modal-tile {
            padding: 3rem 1.5rem;
          }

          .product-description {
            font-size: calc(1.4rem + 0.35vw);
          }
        }

        @media (max-width: 840px) {
          .modal-content-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
})

const CartProductModalWrapper = () => {
  const selector = useSelector(state => state.ui.productModal)

  const productModal = useMemo(() => selector, [selector])

  return <CartProductModal productModal={productModal} />
}

export default CartProductModalWrapper
