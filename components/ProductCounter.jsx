import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_UPDATE } from '../redux/types'

function ProductCounter() {
  const inputCountRef = useRef(null)
  const dispatch = useDispatch()
  const count = useSelector(state => state.product?.count)

  const countHandler = useCallback(e => {
    const value = parseInt(e.target.value) || ''
    if (value > 20) {
      dispatch({ type: PRODUCT_UPDATE, payload: { count: 20 } })
      return
    }

    if (value == NaN || value == undefined) {
      dispatch({ type: PRODUCT_UPDATE, payload: { count: parseInt('') } })
      return
    }

    dispatch({ type: PRODUCT_UPDATE, payload: { count: value } })
  }, [])

  return (
    <div className='product-info-count'>
      <div className='product-info-count-title'>Count:</div>
      <div className='product-info-count-counter'>
        <button
          className='product-info-count-counter-minus button-counter'
          type='button'
          onClick={() => {
            dispatch({ type: PRODUCT_UPDATE, payload: { count: count - 1 > 0 ? count - 1 : count } })
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg'>
            <path d='M9 4v1H0V4z'></path>
          </svg>
        </button>
        <input
          type='number'
          value={count}
          className='product-info-count-input'
          onChange={countHandler}
          ref={inputCountRef}
        />
        <button
          className='product-info-count-counter-plus button-counter'
          type='button'
          onClick={() => {
            let value = count + 1

            if (value > 20) {
              dispatch({ type: PRODUCT_UPDATE, payload: { count: 20 } })
              return
            }

            if (value <= 0 || value === '') {
              dispatch({ type: PRODUCT_UPDATE, payload: { count: 1 } })
              return
            }
            dispatch({ type: PRODUCT_UPDATE, payload: { count: value } })
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg'>
            <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
          </svg>
        </button>
      </div>
      <style jsx>{`
        .button-counter {
          border-radius: 3rem 0 0 3rem;
          transition: 0.1s background ease;
        }

        .button-counter:last-child {
          border-radius: 0 3rem 3rem 0;
        }

        .button-counter:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .product-info-count-counter {
          display: flex;
          max-width: fit-content;
          border-radius: 3rem;
          border: 2px solid #fff;
          margin-bottom: 1.5rem;
        }

        .product-info-count-title {
          color: #636573;
          padding: 0.5rem 0;
          font-weight: 600;
          font-size: 1.7rem;
        }

        .product-info-count {
          display: inline-block;
        }

        .product-info-count-input {
          width: 5rem;
          text-align: center;
          font-weight: 600;
          outline: none;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-left: 2px solid #fff;
          border-right: 2px solid #fff;
          font-size: 1.6rem;
        }

        .product-info-count {
          margin: 1rem 1rem 1rem 0;
        }

        svg {
          fill: #fff;
          height: 9px;
          width: 9px;
        }

        button {
          outline: none;
          background-color: transparent;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}

export default ProductCounter
