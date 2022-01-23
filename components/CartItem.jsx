import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/auth'

function CartItem({ data }) {
  const [productCount, setProductCount] = useState(data.count)
  const [editMode, setEditMode] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  const { cartData, setCartData, setLocalStCart } = useAuth()

  function dropMenuHandler(e) {
    if (e.target.value === '11+') {
      setEditMode(true)
    }

    if (editMode) {
      setProductCount(e.target.value)
      setEditMode(false)
    }
  }

  function updateFieldChanged(e) {
    if (e.target.value <= 20 && e.target.value >= 1) {
      let newArr = [...cartData]
      cartData.findIndex((element, index) => {
        if (element.id + element.options === data.id + data.options) {
          newArr[index] = { ...data, [e.target.name]: parseInt(e.target.value) }
        }
      })

      setProductCount(e.target.value)
      setCartData(newArr)
      setLocalStCart(newArr)
    } else {
      console.log('cannot set count more than 20')
    }
  }

  return (
    <form className='cart-item-counter'>
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
          readOnly={editMode}
          onChange={updateFieldChanged}
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
              <input type='text' className='drop-item' value={'1'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'2'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'3'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'4'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'5'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'6'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'7'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'8'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'9'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'10'} onChange={dropMenuHandler} />
              <input type='text' className='drop-item' value={'11+'} onChange={dropMenuHandler} />
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
        .drop-item {
          position: relative;
          padding: 0.75rem;
          background: none;
          border: none;
          pointer-events: none;
          font-size: 0.9rem;
          border-bottom: 1px solid #a3a3a3;
          width: 100%;
        }

        .drop-item:last-child {
          border-radius: 10px;
        }
      `}</style>
    </form>
  )
}

export default CartItem
