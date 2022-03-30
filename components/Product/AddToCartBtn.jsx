/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductButton from '../ProductButton'
import Spinner from '../Spinner'

export default function AddToCartBtn({ type }) {
  const progress = useSelector(state => state.ui.progress[type])

  return (
    <div className='product-button-wrapper'>
      <ProductButton progress={progress}>
        <span>Add to cart</span>

        {progress && (
          <div className='spinner-wrapper'>
            <Spinner color='#000' borderWidth={5} size={34} />
          </div>
        )}
      </ProductButton>

      <style jsx>{`
        .product-button-wrapper {
          white-space: nowrap;
          display: inline-block;
          position: relative;
          margin: 0 0 2rem;
        }

        .product-button-wrapper span {
          opacity: ${progress ? 0 : 1};
          font-size: inherit;
        }

        .spinner-wrapper {
          position: absolute;
          right: 3px;
          left: 0;
          top: 0;
        }
      `}</style>
    </div>
  )
}
