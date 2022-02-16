import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../contexts/auth'
import { CART_SHOW } from '../../redux/types'

export default function HeaderSecondOther() {
  const dispatch = useDispatch()
  const { cartData = [] } = useSelector(state => state.cart)
  const [totalPrice, setTotalPrice] = useState()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    setTotalPrice(getTotal(cartData))
  }, [cartData])

  function getTotal(cartData) {
    let value = 0

    for (let index = 0; index < cartData.length; index++) {
      value += cartData[index].price * cartData[index].count
    }

    return value.toFixed(2)
  }

  function profileHandler() {
    if (isAuthenticated) {
      router.push('/profile')
    } else {
      //setPopup(prev => ({ ...prev, login: !prev.login }))
    }
  }

  return (
    <div className='header-second-other'>
      {/* profileHandler fn */}
      <div className='header-account-icon icon' onClick={profileHandler}>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <title />
          <g data-name='Layer 2' id='Layer_2'>
            <path d='M24,30H8a5,5,0,0,1-5-5,1,1,0,0,1,.06-.35A13.4,13.4,0,0,1,15.54,16h.92a13.4,13.4,0,0,1,12.48,8.65A1,1,0,0,1,29,25,5,5,0,0,1,24,30ZM5,25.17A3,3,0,0,0,8,28H24a3,3,0,0,0,3-2.83A11.39,11.39,0,0,0,16.46,18h-.92A11.39,11.39,0,0,0,5,25.17Z' />
            <path d='M16,15a6,6,0,1,1,6-6A6,6,0,0,1,16,15ZM16,5a4,4,0,1,0,4,4A4,4,0,0,0,16,5Z' />
            <path d='M24,30H8a5,5,0,0,1-5-5,1,1,0,0,1,.06-.35A13.4,13.4,0,0,1,15.54,16h.92a13.4,13.4,0,0,1,12.48,8.65A1,1,0,0,1,29,25,5,5,0,0,1,24,30ZM5,25.17A3,3,0,0,0,8,28H24a3,3,0,0,0,3-2.83A11.39,11.39,0,0,0,16.46,18h-.92A11.39,11.39,0,0,0,5,25.17Z' />
          </g>
          <g id='frame'>
            <rect height='32' width='32' className='cls-1' />
          </g>
        </svg>
      </div>

      <div className='header-cart icon' onClick={() => dispatch({ type: CART_SHOW })}>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <title />
          <g data-name='Layer 2' id='Layer_2'>
            <path d='M24.33,23H13.53a3,3,0,0,1-2.9-2.21L8,11.26a1,1,0,0,1,.17-.87A1,1,0,0,1,9,10H28a1,1,0,0,1,.77.36,1,1,0,0,1,.21.82l-1.7,9.36A3,3,0,0,1,24.33,23Zm-14-11,2.25,8.26a1,1,0,0,0,1,.74h10.8a1,1,0,0,0,1-.82L26.8,12Z' />
            <path d='M9,12a1,1,0,0,1-1-.73L6.45,5.73a1,1,0,0,0-1-.73H4A1,1,0,0,1,4,3H5.49A3,3,0,0,1,8.38,5.18L10,10.73A1,1,0,0,1,9.27,12,.84.84,0,0,1,9,12Z' />
            <path d='M16,29a2,2,0,1,1,2-2A2,2,0,0,1,16,29Zm0-2h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Z' />
            <path d='M22,29a2,2,0,1,1,2-2A2,2,0,0,1,22,29Zm0-2Z' />
            <path d='M22,17H16a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Z' />
          </g>
          <g id='frame'>
            <rect height='32' width='32' className='cls-1' />
          </g>
        </svg>
      </div>
      <div className='header-cart-total-cost' onClick={() => dispatch({ type: CART_SHOW })}>
        {totalPrice} USD
      </div>
      <style jsx>{`
        .header-cart-total-cost {
          cursor: pointer;
          user-select: none;
        }

        .header-account-icon {
          position: relative;
        }

        .header-second-other {
          display: flex;
          align-items: center;
          position: absolute;
          right: 50px;
          color: #fff;
        }

        .icon:hover {
          filter: brightness(70%);
        }

        .icon {
          padding: 1.5rem 0;
          cursor: pointer;
          transition: filter 0.3s ease;
        }

        .icon svg {
          width: 3rem;
          height: 3rem;
          fill: #fff;
          margin: 0 0.5rem;
        }

        .cls-1 {
          fill: none;
        }

        @media (max-width: 1170px) {
          .header-second-other {
            bottom: 0;
            right: 0;
          }
        }

        @media (max-width: 567px) {
          .header-cart-total-cost {
            display: none;
          }

          .icon svg {
            transform: scale(0.9);
          }

          .icon svg {
            margin-right: 3px;
          }

          .header-second-other {
            position: static;
          }
        }
      `}</style>
    </div>
  )
}
