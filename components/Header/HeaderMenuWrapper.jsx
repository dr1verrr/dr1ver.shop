import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_HIDE } from '../../redux/types'

export default function HeaderMenuWrapper({ children }) {
  const dispatch = useDispatch()
  const isMenuActive = useSelector(state => state.ui.menu)

  return (
    <div className='header-menu-wrapper'>
      <div className='header-mobile-menu-close' onClick={() => dispatch({ type: MENU_HIDE })}>
        Hide menu
      </div>
      {children}
      <style jsx>{`
        .header-mobile-menu-close {
          display: none;
        }

        @media (max-width: 1170px) {
          .header-menu-wrapper {
            width: 100%;
          }
        }

        @media (max-width: 567px) {
          .header-menu-wrapper {
            display: ${isMenuActive ? 'block' : 'none'};
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1500;
            color: #000;
            background: #fff;
            width: 280px;
            font-size: 1.5rem;
          }

          .header-mobile-menu-close {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 2px solid #ebeef1;
            border-top: 0;
            text-transform: uppercase;
            cursor: pointer;
            padding: 1.5rem;
            letter-spacing: 1.5px;
            font-size: 1.4rem;
            height: 100%;
            max-height: 78px;
            user-select: none;
          }
        }
      `}</style>
    </div>
  )
}
