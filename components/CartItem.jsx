/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */

import React, { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react'
import { useAuth } from '../contexts/auth'
import useOnClickOutside from '../hooks/useOnClickOutside'

function CartItem({ data }) {
  const [productCount, setProductCount] = useState(data.count)
  const [editMode, setEditMode] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const inputCountRef = useRef()
  const menuRef = useRef()
  const numArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']
  const [modCartData, setModCartData] = useState([])

  const { cartData, setCartData } = useAuth()

  const handler = useCallback(() => setMenuVisible(false), [])
  useOnClickOutside(menuRef, handler)

  function dropMenuHandler(e, v) {
    if (v === '10+') {
      setEditMode(true)
      return inputCountRef.current.focus()
    }

    updateFieldChanged(e, v)
  }

  function submitHandler(e) {
    e.preventDefault()
    if (Array.isArray(modCartData) && modCartData.length) {
      setCartData(modCartData)
    }
    setEditMode(false)
  }

  function updateFieldChanged(e, option) {
    const value = e.target.value ? parseInt(e.target.value && e.target.value?.replace(/\D/g, '')) : ''

    function ifEditMode() {
      if (editMode && value >= 1 && value <= 20) {
        return parseInt(value)
      }

      if (editMode) {
        if (value > 20) return 20
        if (value < 1 || value === '' || typeof value === 'undefined') return 1
      }

      if (!editMode) return parseInt(option)
    }
    const name = inputCountRef.current.name

    let newArr = [...cartData]
    cartData.findIndex((element, index) => {
      if (element.id + element.options === data.id + data.options) {
        newArr[index] = { ...data, [name]: parseInt(ifEditMode()) }
      }
    })

    setProductCount(ifEditMode())
    if (editMode) {
      setModCartData(newArr)
    } else {
      setCartData(newArr)
    }

    if (menuVisible) setMenuVisible(false)
  }

  return (
    <form className='cart-item-counter' onSubmit={submitHandler}>
      <div
        className='input-group'
        ref={menuRef}
        style={{
          border: menuVisible || editMode ? '2px solid #333' : '1px solid #cccccc',
          cursor: 'pointer',
          borderRadius: '10px',
          position: 'relative',
        }}
        onClick={() => !editMode && setMenuVisible(prev => !prev)}
      >
        <input
          type='number'
          className='cart-item-count'
          value={productCount}
          name='count'
          ref={inputCountRef}
          readOnly={!editMode}
          onChange={e => updateFieldChanged(e)}
          style={{
            border: 'none',
            background: 'transparent',
            padding: '0.7rem 0.7rem 0.7rem 1.5rem',
            outline: 'none',
            fontSize: '0.9rem',
            pointerEvents: editMode ? 'all' : 'none',
            width: '100%',
          }}
        />
        {menuVisible && (
          <div
            className='drop-menu'
            style={{
              position: 'absolute',
              marginTop: '10px',
              boxShadow: '2px 6px 21px -2px rgba(0,0,0,0.75)',
              background: '#f5f4f4',
              borderRadius: '10px',
              zIndex: 5,
              width: '100%',
            }}
          >
            <div className='drop-list'>
              {numArr.map(n => {
                return (
                  <div key={n} type='text' className='drop-list-item' value={n} onClick={e => dropMenuHandler(e, n)}>
                    {n}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .drop-list-item {
          position: relative;
          padding: 0.5rem 0.5rem 0.5rem 1.5rem;
          background: none;
          border: none;
          pointer-events: 'none';
          font-size: 0.9rem;
          border-bottom: 1px solid #a3a3a3;
          width: 100%;
        }

        .drop-list-item:first-child {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .drop-list-item:active {
          transition: background 0.25s ease;
          background: rgba(49, 190, 252, 0.4) !important;
        }

        .drop-list-item:hover {
          background: rgba(49, 190, 252, 0.2);
        }

        .drop-list-item:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        .cart-item-count {
          border: none;
          background-image: none;
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          width: 30%;
          min-width: 50px;
          max-width: 200px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </form>
  )
}

export default CartItem
