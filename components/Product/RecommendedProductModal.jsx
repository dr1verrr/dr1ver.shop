import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { getProduct } from '../../pages/api/product'
import ProductProvider from '../../providers/ProductProvider'
import { RECOMMENDED_PRODUCT_MODAL_HIDE } from '../../redux/types'
import Product from './Product'

export default function RecommendedProductModal({ slug }) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})
  const modalRef = useRef()
  const dispatch = useDispatch()

  useOnClickOutside(modalRef, () => {
    dispatch({ type: RECOMMENDED_PRODUCT_MODAL_HIDE })
  })

  useEffect(() => {
    getProduct(slug).then(p => {
      setProduct(p)
      setLoading(false)
    })
  }, [slug])

  return (
    <div className='modal'>
      <div className='modal-inner'>
        <div className='modal-content' ref={modalRef}>
          <ProductProvider type={'recommendedModalProduct'}>
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
          top: 0;
        }

        .modal-inner {
          margin: 2.5rem;
          width: 85%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          width: 900px;
          height: 85vh;
          padding: 3rem;
          border-radius: 20px;
          background: #fff;
          pointer-events: all;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  )
}
