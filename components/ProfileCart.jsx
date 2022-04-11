/* eslint-disable react/display-name */
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../redux/actions'
import { CART_UPDATE } from '../redux/types'
import { saveChanges } from '../services/Cart/saveChanges'
import Button from './Button'
import CartItem from './Cart/CartItem'
import TotalPrice from './TotalPrice'
import useDebouncedFunction from '../hooks/useDebouncedFunction'

const CartItems = memo(({ cartData, lastModified }) => {
  return cartData.length ? (
    <div className='cart-items'>
      {cartData?.map(item => (
        <CartItem
          product={item}
          key={item.id + item.selected[0]}
          lastModified={
            lastModified && item.id == lastModified.id && item.selected === lastModified.selected ? lastModified : null
          }
        />
      ))}
      <style jsx>
        {`
          .cart-items {
            margin-bottom: 2rem;
          }
        `}
      </style>
    </div>
  ) : null
})

const ProfileCart = () => {
  const { cartData, lastModified } = useSelector(state => state.cart)
  const [isHovered, setHovered] = useState(false)
  const checkoutHandler = () => dispatch(showModal('Temporary cannot accept payments :/'))
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const [filtered, setFiltered] = useState([])

  const filterProducts = () => {
    const removeDots = str => str.split('.').join('').toLowerCase()

    const arr = cartData?.filter(item => removeDots(item.name).includes(removeDots(searchValue)))
    setFiltered(arr)
  }

  const debounceFilter = useDebouncedFunction(filterProducts, 450)

  const removeAllProducts = () => {
    saveChanges(
      [],
      () => {
        dispatch({ type: CART_UPDATE, payload: { cartData: [], lastModified: {} } })
        dispatch(showModal('All products were deleted.'))
      },
      true
    )
  }

  const searchHandler = e => setSearchValue(e.target.value)

  useEffect(() => {
    if (!searchValue || !cartData.length) window.scrollTo(0, 0)
    if (searchValue) debounceFilter()
  }, [searchValue])

  useEffect(() => {
    if (!cartData.length) {
      setFiltered([])
    } else {
      filterProducts()
    }
  }, [cartData])

  useEffect(() => {
    if (filtered.length) window.scrollTo(0, 0)
  }, [filtered])

  return (
    <div className='user-cart'>
      <div className='user-cart-title'>My purchases</div>
      {cartData.length ? (
        <div className='controls'>
          <div className='search'>
            <input
              type='text'
              className='search-input'
              value={searchValue}
              onChange={searchHandler}
              placeholder='search'
            />
          </div>
          <div className='remove-all'>
            <Button
              style={{ padding: '1rem 2rem', height: '100%', fontSize: '1.4rem', letterSpacing: 'initial' }}
              onClick={removeAllProducts}
            >
              Remove all
            </Button>
          </div>
        </div>
      ) : null}

      <CartItems cartData={searchValue ? filtered : cartData} lastModified={lastModified} />

      <div className='cart-total' onMouseOver={() => setHovered(!isHovered)} onMouseOut={() => setHovered(!isHovered)}>
        <label>Total:</label>{' '}
        <span>
          <TotalPrice isHovered={isHovered} />
        </span>
      </div>
      <div className='cart-checkout'>
        <Button onClick={checkoutHandler}>CHECKOUT</Button>
      </div>
      <style jsx>{`
        .user-cart {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          padding: 0 2rem;
        }

        .controls {
          display: flex;
          align-items: stretch;
          justify-content: center;
          white-space: nowrap;
          margin-bottom: 2rem;
        }

        .search {
          width: 100%;
          margin-right: 1.5rem;
          scroll-margin: 8.5rem;
        }

        .search-input {
          width: 100%;
          height: 100%;
          border: 1px solid #9598a6;
          padding: 1rem 1.5rem;
          border-radius: 30px;
          font-size: 1.6rem;
        }

        .user-cart-title {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 18px 0 0;
          font-size: 26px;
          line-height: 78px;
        }

        .user-cart-title::after {
          content: '';
          -webkit-flex: 1 1;
          -ms-flex: 1 1;
          flex: 1 1;
          height: 2px;
          margin-left: 18px;
          margin-top: 6px;
          background: #000;
        }

        .cart-checkout {
          margin: 2rem 0;
        }
      `}</style>
    </div>
  )
}

export default ProfileCart
