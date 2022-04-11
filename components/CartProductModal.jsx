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
          <div className='icon modal-close' onClick={hideProductModal}>
            <svg className='cross' xmlns='http://www.w3.org/2000/svg' width={15} height={15}>
              <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
            </svg>
          </div>
          <div className='spinner-wrapper'>{loading && <Spinner color='#000' size={50} />}</div>
          <div className='modal-content'>
            {!loading && (
              <div className='modal-content-inner'>
                {product.image && (
                  <Link
                    href={{ pathname: `/product/[slug]`, query: { slug: product.slug, name: product.title } }}
                    passHref
                  >
                    <div className='product-image link-hover' onClick={hideModals}>
                      <Image src={product.image.url} alt='' width={product.image.width} height={product.image.height} />
                    </div>
                  </Link>
                )}

                <div className='product-info'>
                  <div className='product-title link-hover'>
                    <Link href={`/product/${product.slug}?name=${product.title}`}>
                      <a href='' onClick={hideModals}>
                        {product.title}
                      </a>
                    </Link>
                  </div>
                  <div className='product-price'>
                    <span className='wrapper'>
                      <span className='price'>{product.price}</span> <span className='currency'>USD</span>
                    </span>
                  </div>
                  <div className='product-description'>{product.description}</div>
                </div>
              </div>
            )}
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
        }

        .product-image {
          min-width: 350px;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .link-hover {
          transition: opacity 0.25s ease;
        }

        .link-hover:hover {
          opacity: 0.5;
        }

        .product-price {
          background: #000;
          color: #fff;
          padding: 0.5rem 2.5rem;
          font-size: 2.4rem;
          min-width: fit-content;
          margin: 1.5rem 0;
          white-space: nowrap;
          border-radius: 3rem;
          border: none;
          white-space: nowrap;
          max-width: fit-content;
          font-weight: 500;
        }

        .product-description {
          color: #484450;
          font-size: 1.8rem;
          color: #484450;
          text-align: left;
        }

        .modal-tile {
          min-height: 500px;
        }

        .spinner-wrapper {
          position: absolute;
          top: 45%;
          transform: translateY(-45%);
          left: calc(50% - 25px);
          z-index: 500;
        }

        .modal-content {
          overflow-y: auto;
          max-height: inherit;
          padding: 1.5rem 2.5rem 4rem;
        }

        .modal-content-inner {
          display: flex;
          grid-gap: 2rem;
          align-items: flex-start;
          margin-top: 3.5rem;
        }

        .product-title {
          font-size: 2.5rem;
          font-weight: 500;
          text-align: left;
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
          width: 920px;
          position: relative;
          margin: 5vw 1.5rem;
          border-radius: 20px;
          background: #fff;
          overflow: hidden;
        }

        .modal-close {
          position: absolute;
          padding: 20px;
          top: 0;
          right: 0;
          cursor: pointer;
          z-index: 500;
        }

        @media (max-width: 500px) {
          .product-image {
            min-width: 200px;
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

          .modal-tile {
            max-height: 85vh;
          }

          .product-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
