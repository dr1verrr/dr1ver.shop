import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { getProduct } from '../../pages/api/product'
import ProductProvider from '../../providers/ProductProvider'
import { RECOMMENDED_PRODUCT_MODAL_HIDE } from '../../redux/types'
import Product from './Product'

export default function ProductModal({ slug }) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})
  const modalRef = useRef()
  const dispatch = useDispatch()

  const hideModal = () => {
    dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })
  }

  useOnClickOutside(modalRef, hideModal)

  useEffect(() => {
    getProduct(slug).then(p => {
      setProduct(p)
      setLoading(false)
    })
  }, [slug])

  return (
    <div className='modal'>
      <div className='modal-inner' ref={modalRef}>
        <div className='modal-close' onClick={hideModal}>
          <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'>
            <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
          </svg>
        </div>
        <div className='modal-content'>
          <ProductProvider type={'productModal'}>
            <Product product={product.product} loading={loading} />
          </ProductProvider>
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          z-index: 1000;
          pointer-events: none;
          height: 100%;
          left: 0;
          overflow-y: scroll;
          top: 0;
        }

        .modal-close {
          position: absolute;
          top: -15px;
          right: 0;
          padding: 30px;
          cursor: pointer;
          pointer-events: all;
          z-index: 5000;
          max-width: 15px;
          max-height: 15px;
        }

        .modal-inner {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 20px;
          pointer-events: all;
        }

        .modal-content {
          width: 960px;
          min-height: 300px;
          max-height: 85vh;
          overflow-y: scroll;
          padding: 3rem;
        }

        @media (max-width: 470px) {
          .modal-content {
            padding: 3rem 0;
          }
        }

        @media (max-width: 1040px) {
          .modal-inner {
            max-width: 500px;
          }
        }
        @media (max-width: 570px) {
          .modal-inner {
            width: 90%;
          }
        }
      `}</style>
    </div>
  )
}
