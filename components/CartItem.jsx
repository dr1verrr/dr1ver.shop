import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

function CartItem({ product, cartVisible }) {
  const [selected, setSelected] = useState('')
  const [active, setActive] = useState(true)
  const productRef = useRef()

  useEffect(() => {
    setSelected(product.options)
  }, [product])

  function scrollToChanged(ref) {
    ref.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollToChanged(productRef)
  }, [product])

  function countHandler(e) {}

  return (
    <div className='cart-item' ref={productRef}>
      <div className='cart-left'>
        <Link href={`/product/${product.slug}`} passHref>
          <div className='product-image'>
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`} width={150} height={150} alt='' />
            <div className='product-image-mask'></div>
          </div>
        </Link>
      </div>
      <div className='cart-right'>
        <div className='product-title'>{product.name}</div>
        <div className='product-options'>
          {product?.Custom_Field.map(fld => {
            const select = fld.options.split('|')
            return (
              <div key={fld.id} className='product-info-sizes'>
                <div style={{ color: '#818d92', fontWeight: '400', fontSize: '1.6rem' }}>Size: </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    paddingTop: '0.75rem',
                  }}
                >
                  {select.map(s => {
                    const option = s.replace(/ *\[[^\]]*]/, '').replace(/\[|\]/g, '')
                    /// value = option
                    return (
                      <input
                        type='button'
                        key={s}
                        className='product-info-sizes-input'
                        active={active && selected === option ? 'true' : 'false'}
                        value={option}
                        onClick={e => {
                          setSelected(e.target.value)
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className='product-count'>
          <div className='count-title'>Count: </div>
          <div className='counter'>
            <input type='number' className='counter-input' value={product.count} onChange={countHandler} />
            <div className='counter-control'>awfawf</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cart-item {
          padding: 2.5rem 0;
          border-bottom: 1px solid #dcdee0;
          display: flex;
          gap: 15px;
        }

        .counter {
          display: flex;
        }

        .counter-input {
          -moz-appearance: textfield;
          outline: none;
          padding: 0 20px 0 10px;
          max-width: 50px;
          border-right: 1px solid #ccc;
        }

        .counter-control {
          padding: 0 10px;
        }

        .product-title {
          font-weight: bold;
        }

        .count-title {
          font-size: 1.6rem;
          color: #929da1;
        }

        input[active='false']:first-child {
          padding-left: 0;
        }

        input[active='false'] {
          padding-top: 5px;
          padding-bottom: 5px;
        }

        input[active='true'] {
          color: #000;
          padding: 0 5px;
          border-right: 1px solid #ccc;
          border-left: 1px solid #ccc;
          font-weight: bold;
          margin-top: 2.5px;
        }

        .product-info-sizes-input {
          cursor: pointer;
        }

        input {
          border: none;
          background-image: none;
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }

        .cart-right {
          display: flex;
          flex-direction: column;
        }

        .product-image {
          position: relative;
          width: 120px;
          padding: 11px;
          background: #fff;
          border: 1px solid #e2e7ec;
          border-radius: 10px;
          cursor: pointer;
        }

        .product-image-mask {
          transition: all 0.25s ease;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: #fff;
          opacity: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
        }
        .product-image-mask:hover {
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}

export default CartItem
