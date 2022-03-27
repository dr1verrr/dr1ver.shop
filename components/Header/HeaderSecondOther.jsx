import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../contexts/auth'
import { AUTH_MODAL_UPDATE, CART_SHOW } from '../../redux/types'
import TotalPrice from '../TotalPrice'

export default function HeaderSecondOther() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  function profileHandler() {
    if (isAuthenticated) {
      router.push('/profile')
    } else {
      dispatch({ type: AUTH_MODAL_UPDATE, payload: { visible: true } })
    }
  }

  return (
    <div className='header-second-other'>
      {/* profileHandler fn */}
      <div className='header-account icon' onClick={profileHandler}>
        <svg className='account' xmlns='http://www.w3.org/2000/svg'>
          <path d='M10.5 0C6.82 0 3.82 3 3.82 6.68c0 2.29 1.16 4.31 2.92 5.52A9.534 9.534 0 00.95 21h1.91c0-4.26 3.37-7.64 7.64-7.64s7.64 3.37 7.64 7.64h1.91c0-3.95-2.37-7.35-5.79-8.8a6.68 6.68 0 002.92-5.52C17.18 3 14.18 0 10.5 0zm0 1.91c2.65 0 4.77 2.13 4.77 4.77s-2.13 4.77-4.77 4.77-4.77-2.12-4.77-4.77 2.12-4.77 4.77-4.77z'></path>
        </svg>
      </div>

      <div className='header-cart icon' onClick={() => dispatch({ type: CART_SHOW })}>
        <svg className='cart' xmlns='http://www.w3.org/2000/svg'>
          <path d='M6.02 7L4.27 0H.11v1.75h2.84l3.5 14h11.81L20.89 7H6.02zm10.93 7H7.77L6.45 8.75h12.03L16.95 14zM9.3 16.63c1.21 0 2.19.98 2.19 2.19S10.5 21 9.3 21s-2.19-.98-2.19-2.19.98-2.18 2.19-2.18zm3.93 2.18a2.19 2.19 0 104.379.001 2.19 2.19 0 00-4.379-.001z'></path>
        </svg>
      </div>
      <div className='header-cart-total-cost' onClick={() => dispatch({ type: CART_SHOW })}>
        <TotalPrice />
      </div>
      <style jsx>{`
        .header-cart-total-cost {
          cursor: pointer;
          user-select: none;
        }

        .header-account {
          position: relative;
          margin-right: 0.75rem;
        }

        .header-second-other {
          display: flex;
          align-items: center;
          position: absolute;
          right: 50px;
          color: #fff;
        }

        .icon:hover {
          filter: brightness(80%);
        }

        .icon {
          padding: 1.5rem 0;
          cursor: pointer;
          transition: filter 0.3s ease;
        }

        .icon svg {
          width: 21px;
          height: 21px;
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

        @media (max-width: 630px) {
          .header-cart-total-cost {
            display: none;
          }

          .header-cart {
            margin-right: 0.75rem;
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
