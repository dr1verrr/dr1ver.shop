import React from 'react'
import { useDispatch } from 'react-redux'
import { MENU_SHOW } from '../../redux/types'

export default function HeaderMobileMenu() {
  const dispatch = useDispatch()

  return (
    <div className='icon header-mobile-menu-icon icon__animated' onClick={() => dispatch({ type: MENU_SHOW })}>
      <div className='menu-wrapper'>
        <svg className='menu' xmlns='http://www.w3.org/2000/svg'>
          <path d='M36,2H0V0h36V2z M36,18H0v2h36V18z M36,9H0v2h36V9z'></path>
        </svg>
      </div>
      <style jsx>{`
        .header-mobile-menu-icon {
          display: none;
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

        @media (max-width: 620px) {
          .header-mobile-menu-icon {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 60px;
            padding: 0 !important;
          }

          .menu-wrapper {
            height: 20px;
          }
        }
      `}</style>
    </div>
  )
}
