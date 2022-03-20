import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../contexts/auth'
import findDuplicateProduct from '../../services/Cart/findDuplicateProduct'
import { showModal } from '../../redux/actions'
import store from '../../redux/store'
import { CART_UPDATE } from '../../redux/types'
import CartOption from '../Product/ProductOption'
import CartButton from '../ProductButton'
import CartCount from './CartCount'

export default function CartItemInfo({ product, showProductModal }) {
  const price = product.price
  const [count, setCount] = useState({ value: product.count, old: product.count, changed: false })
  const [option, setOption] = useState({
    selected: product.selected,
    old: product.selected,
    price: product.optionPrice,
    changed: false,
  })
  const isChanged = option.changed || count.changed

  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()

  const resetChanges = () => {
    setCount({ old: product.count, value: product.count, changed: false })
    setOption({ old: product.selected, selected: product.selected, price: product.optionPrice, changed: false })
  }

  const saveChanges = () => {
    const getUpdatedProduct = findDuplicateProduct

    const updated = {
      option: { selected: option.selected, price: option.price },
      count: count.value,
    }

    const params = {
      option: { old: option.old },
      count: { old: count.old },
      id: product.id,
      isAuthenticated,
    }

    const cartData = store.getState().cart.cartData

    const updatedProduct = getUpdatedProduct(cartData, updated, params)

    if (updatedProduct.cartData) {
      dispatch({ type: CART_UPDATE, payload: updatedProduct })
      dispatch(showModal(`Product ${option.changed && count.changed ? 'options were changed' : 'option was changed'}.`))
    } else {
      resetChanges()
      dispatch({ type: CART_UPDATE, payload: { lastModified: updatedProduct.lastModified } })
      dispatch(showModal('Product is already exist.'))
    }
  }

  useEffect(resetChanges, [product])

  return (
    <div className='cartItem-options'>
      <div className='cart-right'>
        <div className='item-cart-price'>{(count.value * (price + option.price)).toFixed(2)} USD</div>
        <div className='item-title' onClick={showProductModal}>
          {product.name}
        </div>
        <div className='item-options'>
          {product?.Custom_Field.map(fld => (
            <CartOption key={fld} fld={fld} cart={true} option={option} setOption={setOption} />
          ))}
        </div>
        <div className='item-count'>
          <div className='count-label label'>Count: </div>
          <CartCount
            count={count}
            setCount={setCount}
            isChanged={isChanged}
            resetChanges={resetChanges}
            saveChanges={saveChanges}
          />
        </div>
        {isChanged && (
          <div className='save-changes-wrapper'>
            {count.value !== 0 && (
              <div className='btn-save' onClick={saveChanges}>
                <CartButton btnType='cart-changes-save' cart={true}>
                  Save changes
                </CartButton>
              </div>
            )}
            <div className='btn-reset-changes' onClick={resetChanges}>
              <CartButton btnType='cart-changes-reset' cart={true}>
                Reset
              </CartButton>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .cartItem-options {
          width: 100%;
        }

        .item-count {
          display: flex;
          flex-direction: column;
          min-height: 75px;
          margin-bottom: 1rem;
        }

        .count-label {
          font-size: 1.5rem;
          color: #929da1;
          flex: 1;
        }

        .cart-right {
          display: flex;
          flex-direction: column;
        }

        .item-title {
          transition: 0.25s color ease;
          color: rgba(0, 0, 0, 1);
          font-size: 2rem;
          cursor: pointer;
          width: fit-content;
          padding-bottom: 1rem;
          font-weight: 500;
          word-break: break-word;
        }

        .item-title:hover {
          color: rgba(0, 0, 0, 0.6);
        }

        .item-options {
          margin-bottom: 2rem;
        }

        .item-cart-price {
          position: absolute;
          white-space: nowrap;
          right: 0;
          bottom: 15px;
        }

        @keyframes btnChange {
          0% {
            transform: scale(0.9);
          }

          100% {
            transform: scale(1);
          }
        }

        .save-changes-wrapper {
          display: flex;
          grid-gap: 0.5rem;
          width: 120px;
          flex-direction: column;
          position: absolute;
          bottom: 60px;
          left: 0;
          animation: btnChange 0.3s ease;
        }

        @media (max-width: 420px) {
          .product-counter {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 340px) {
          .save-changes-wrapper {
            position: static;
            margin-top: 2rem;
            flex-direction: row;
            width: 100%;
            justify-content: center;
          }

          .btn-save,
          .btn-reset-changes {
            width: 100%;
          }

          .cart-right {
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
