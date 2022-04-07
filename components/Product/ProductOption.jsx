import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

function ProductOption({ fld, cart, actionType, option, setOption }) {
  const options = fld.options.split('|').map(opt => {
    const optionPrice = parseFloat(opt.match(/\[*(\d+.\d+)\]/)[1])
    const optionName = opt.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')

    return { optionPrice, optionName }
  })

  const dispatch = useDispatch()

  const optionHandler = useCallback((optName, optPrice) => {
    if (cart) {
      return setOption({
        ...option,
        selected: optName,
        price: optPrice,
        changed: option.old !== optName ? true : false,
      })
    }
    dispatch({ type: actionType, payload: { selected: optName, optionPrice: optPrice } })
  }, [])

  return (
    <div key={fld.id} className={`product-options ${cart ? 'cart' : ''}`}>
      <div className='product-label label'>{cart ? 'Size' : fld.title}:</div>
      <div className='input-wrapper'>
        {options.map(opt => {
          const optName = opt.optionName
          const optPrice = opt.optionPrice
          const value = optName.charAt(0)

          return (
            <input
              type='button'
              key={optName}
              className='product-option'
              active={`${option?.selected === optName}`}
              changed={`${option.changed && option?.selected === optName}`}
              value={value}
              onClick={() => optionHandler(optName, optPrice)}
            />
          )
        })}
      </div>
      <style jsx>{`
        input {
          display: block;
          color: #797b8c;
          position: relative;
          transition-duration: 0.3s;
          transition-property: color, background, transform, border-color, filter, opacity, font-weight;
          cursor: pointer;
          border: 2px solid #797b8c;
          background: transparent;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          margin-bottom: 1rem;
          margin-right: 0.5rem;
          font-size: 1.6rem;
        }

        .label {
          font-size: 1.5rem;
        }

        .product-option[active='true'] {
          background: #fff;
          color: #000;
          border: 2px solid #fff;
          font-weight: 700;
        }

        .cart .product-option {
          background: #e2e7ec;
          border: none;
        }

        .cart .product-label {
          font-size: 1.5rem;
          color: #929da1;
        }

        .cart .product-option[active='true'] {
          color: #000;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
            0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
        }

        .cart .product-option[changed='true'] {
          border: 2px solid #1e90ff;
        }

        .product-options {
          padding: 0.75rem 0;
        }

        .product-option[active='false']:hover {
          filter: brightness(1.5);
        }

        .cart .product-option[active='false']:hover {
          filter: brightness(0.9);
        }
        .product-option:last-child {
          margin-right: 0;
        }

        .input-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 0.75rem;
        }

        .cart .input-wrapper {
          gap: 0;
        }

        @media (max-width: 720px) {
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
