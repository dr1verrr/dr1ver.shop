import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_UPDATE } from '../../redux/types'

function ProductOption({ fld }) {
  const selected = useSelector(state => state.product?.selected)
  const select = fld.options.split('|')

  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const optionHandler = useCallback((e, price) => {
    dispatch({ type: PRODUCT_UPDATE, payload: { selected: e.target.value, optionPrice: price } })
  }, [])

  if (!mounted) return null

  return (
    <div key={fld.id} className='product-info-sizes'>
      <div style={{ color: '#636573', fontWeight: '600', fontSize: '1.7rem' }}>{fld.title}:</div>
      <div className='input-wrapper'>
        {select.map(s => {
          const price = parseFloat(s.match(/\[*(\d+.\d+)\]/)[1])
          const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
          if ((selected?.trim().length === 0 && option.startsWith('S')) || option.startsWith('s')) {
            dispatch({ type: PRODUCT_UPDATE, payload: { selected: option } })
          }
          return (
            <input
              type='button'
              key={s}
              className='product-info-sizes-input'
              active={selected === option ? 'true' : 'false'}
              value={option}
              onClick={e => optionHandler(e, price)}
            />
          )
        })}
      </div>
      <style jsx>{`
        .product-info-sizes-input[active='true'] {
          background-color: #fff;
          color: #000;
        }

        .product-info-sizes {
          padding: 0.75rem 0;
        }

        .product-info-sizes-input {
          display: block;
          color: #797b8c;
          position: relative;
          transition: all 0.2s ease;
          transition-property: color, background-color, transform, border;
          cursor: pointer;
          border-style: none;
          background: #474852;
          border-radius: 3rem;
          padding: 0.75rem 1.5rem;
          margin-bottom: 1rem;
          margin-right: 0.5rem;
          font-size: 1.6rem;
          border: 1px solid transparent;
        }

        .product-info-sizes-input[active='false']:hover {
          border: 1px solid #fff;
        }

        .product-info-sizes-input:active {
          transform: scale(1.1);
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

        @media (max-width: 620px) {
          .input-wrapper {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductOption
