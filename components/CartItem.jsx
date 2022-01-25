/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */

import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/auth'

function CartItem({ data }) {
  const [productCount, setProductCount] = useState(data.count)
  const [editMode, setEditMode] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const inputCountRef = useRef()
  const numArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']
  const [modCartData, setModCartData] = useState([])

  const { cartData, setCartData } = useAuth()

  function dropMenuHandler(e, v) {
    if (v === '10+') {
      setEditMode(true)
      return inputCountRef.current.focus()
    }
    updateFieldChanged(e, v)
  }

  function submitHandler(e) {
    e.preventDefault()
    setCartData(modCartData)
  }

  function updateFieldChanged(e, option) {
    const value = e.target.value ? parseInt(e.target.value && e.target.value?.replace(/\D/g, '')) : ''

    function ifEditMode() {
      if (editMode && value >= 1 && value <= 20) {
        return parseInt(value)
      }
      if (editMode) {
        if (value > 20) return 20
        if (value < 1 || value === '') return 1
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
  }

  return (
    <form className='cart-item-counter' onSubmit={submitHandler}>
      <div
        className='input-group'
        style={{
          border: menuVisible ? '2px solid #333' : '1px solid #cccccc',
          cursor: 'pointer',
          borderRadius: '10px',
          position: 'relative',
        }}
        onClick={() => setMenuVisible(prev => !prev)}
      >
        <input
          type='text'
          className='cart-item-count'
          value={productCount}
          name='count'
          ref={inputCountRef}
          readOnly={!editMode}
          onChange={e => updateFieldChanged(e)}
          style={{
            border: 'none',
            background: 'transparent',
            padding: '0.7rem',
            outline: 'none',
            pointerEvents: editMode ? 'all' : 'none',
            fontSize: '0.9rem',
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

        <span style={{ padding: '0 10px 0 0' }}>
          <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg' className='ui-u7'>
            <path d='M11.8 6.6l-3 4a1 1 0 01-1.6 0l-3-4A1 1 0 015 5h6a1 1 0 01.8 1.6z' fill='currentColor'></path>
          </svg>
        </span>
      </div>

      <style jsx>{`
        .drop-list-item {
          position: relative;
          padding: 0.75rem;
          background: none;
          border: none;
          pointer-events: 'none';
          font-size: 0.9rem;
          border-bottom: 1px solid #a3a3a3;
          width: 100%;
        }

        .drop-list-item:last-child {
          border-radius: 10px;
        }
      `}</style>
    </form>
  )
}

export default CartItem
