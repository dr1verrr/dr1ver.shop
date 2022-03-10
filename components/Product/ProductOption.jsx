import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { CART_UPDATE, PRODUCT_UPDATE } from '../../redux/types'

function ProductOption({ fld, cart, optionSelected, type, actionType, id }) {
  const options = fld.options.split('|')
  const dispatch = useDispatch()

  const optionHandler = useCallback((value, price) => {
    if (cart) {
      return dispatch({
        type: CART_UPDATE,
        payload: { id, optionPrice: price, selected: value, oldSelected: optionSelected },
      })
    }
    dispatch({ type: actionType, payload: { selected: value, optionPrice: price } })
  }, [])

  return (
    <div key={fld.id} className={`product-info-sizes ${cart ? 'cart' : ''}`}>
      <div className='product-info-label'>{cart ? 'Size' : fld.title}:</div>
      <div className='input-wrapper'>
        {options.map(s => {
          const price = parseFloat(s.match(/\[*(\d+.\d+)\]/)[1])
          const value = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
          const option = value.charAt(0)

          return (
            <input
              type='button'
              key={s}
              className='product-info-sizes-input'
              active={optionSelected === value ? 'true' : 'false'}
              value={option}
              onClick={e => optionHandler(value, price)}
            />
          )
        })}
      </div>
      <style jsx>{`
        .product-info-sizes-input {
          display: block;
          color: #797b8c;
          position: relative;
          transition-duration: 0.3s;
          transition-property: color, background-color, transform, border, filter, opacity;
          cursor: pointer;
          border: 2px solid #797b8c;
          background: transparent;
          border-radius: 50%;
          min-width: 38px;
          min-height: 38px;
          margin-bottom: 1rem;
          margin-right: 0.5rem;
          font-size: 1.6rem;
          font-weight: 700;
        }

        .product-info-sizes-input[active='true'] {
          background-color: #fff;
          color: #000;
          border: 2px solid #fff;
        }

        .cart .product-info-label {
          font-size: 1.5rem;
          color: #929da1;
        }

        .cart .product-info-sizes-input {
          background: #e2e7ec;
          border: none;
        }

        .cart .product-info-sizes-input[active='true'] {
          color: #000;
          background-color: #fff;
          border: 1px solid #797b8c;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
            0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
        }

        input[active='true']:hover {
          filter: none;
          color: #999;
        }

        .product-info-sizes-input:hover {
          filter: brightness(0.9);
        }

        .product-info-sizes {
          padding: 0.75rem 0;
        }

        .product-info-sizes-input[active='false']:hover {
          filter: brightness(1.5);
        }

        .cart .product-info-sizes-input[active='false']:hover {
          filter: brightness(0.9);
        }
        .product-info-sizes-input:last-child {
          margin-right: 0;
        }

        .input-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 0.75rem;
        }

        .cart .input-wrapper {
          gap: 0rem;
        }

        @media (max-width: 630px) {
          .input-wrapper {
            justify-content: center;
          }

          .cart .input-wrapper {
            justify-content: normal;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductOption
