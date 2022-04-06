import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

function ProductCounter({ count, actionType }) {
  const dispatch = useDispatch()

  const countHandler = useCallback(e => {
    const value = parseInt(e.target.value) || ''
    if (value > 20) {
      dispatch({ type: actionType, payload: { count: 20 } })
      return
    }

    if (value >= 1) {
      dispatch({ type: actionType, payload: { count: value } })
      return
    }

    if (value <= 0) {
      dispatch({ type: actionType, payload: { count: 1 } })
    }
  }, [])

  return (
    <div className='product-count'>
      <div className='product-label label'>Count:</div>
      <div className='product-count-counter'>
        <button
          className='product-count-counter-decrement button-counter'
          type='button'
          onClick={() => {
            dispatch({ type: actionType, payload: { count: count - 1 > 0 ? count - 1 : count } })
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg'>
            <path d='M9 4v1H0V4z'></path>
          </svg>
        </button>
        <input type='number' value={count} className='product-count-counter-input' onChange={countHandler} />
        <button
          className='product-count-counter-increment button-counter'
          type='button'
          onClick={() => {
            let value = count + 1

            if (value > 20) {
              dispatch({ type: actionType, payload: { count: 20 } })
              return
            }

            if (value <= 0 || value === '') {
              dispatch({ type: actionType, payload: { count: 1 } })
              return
            }
            dispatch({ type: actionType, payload: { count: value } })
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg'>
            <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
          </svg>
        </button>
      </div>
      <style jsx global>{`
        .product-label {
          color: #636573;
          padding: 0.5rem 0;
          font-size: 1.7rem;
        }
      `}</style>
      <style jsx>{`
        .product-count-counter {
          display: flex;
          max-width: fit-content;
          border-radius: 3rem;
          border: 2px solid #fff;
          margin-bottom: 1.5rem;
          height: 48px;
        }

        .product-count-counter-input {
          width: 5rem;
          text-align: center;
          outline: none;
          border: none;
          background: #fff;
          color: #000;
          border-left: 2px solid #fff;
          border-right: 2px solid #fff;
          font-size: 1.6rem;
          font-weight: 500;
        }

        .product-count {
          display: inline-block;
          max-width: fit-content;
          margin: 1rem 1rem 1rem 0;
        }

        svg {
          fill: #fff;
          height: 9px;
          width: 9px;
        }

        button {
          outline: none;
          background: transparent;
          height: 100%;
          padding: 0 2.5rem;
          border: none;
          cursor: pointer;
          border-radius: 3rem 0 0 3rem;
          transition: 0.1s background ease;
          overflow: hidden;
        }

        button:last-child {
          border-radius: 0 3rem 3rem 0;
        }

        button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 920px) {
          button:hover {
            background: transparent;
          }
        }

        @media (max-width: 720px) {
          .product-count {
            margin-right: 0;
          }
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}

export default ProductCounter
