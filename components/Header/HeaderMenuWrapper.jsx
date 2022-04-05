import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MENU_HIDE } from '../../redux/types'

export default function HeaderMenuWrapper({ children }) {
  const dispatch = useDispatch()
  const isMenuActive = useSelector(state => state.ui.menu)

  return (
    <div className='header-menu-wrapper'>
      <div className='header-mobile-menu-close'>
        <div className='header-mobile-menu-close-inner' onClick={() => dispatch({ type: MENU_HIDE })}>
          <div className='header-mobile-menu-hide'>hide</div>
          <div className='icon header-mobile-menu-cross icon__animated'>
            <svg className='cross' xmlns='http://www.w3.org/2000/svg'>
              <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
            </svg>
          </div>
        </div>
      </div>
      {children}
      <style jsx>{`
        .header-mobile-menu-close {
          position: relative;
          display: none;
        }

        .header-mobile-menu-cross {
          fill: #cacaca;
          cursor: pointer;
        }

        .header-mobile-menu-close-inner {
          position: absolute;
          right: 5px;
          top: 0;
          display: flex;
          cursor: pointer;
          padding: 1.25rem;
        }

        .header-mobile-menu-hide {
          text-transform: none;
          display: flex;
          align-items: center;
          height: 15px;
          color: #cacaca;
          margin-right: 10px;
        }

        .icon .cross {
          width: 15px;
          height: 15px;
        }

        @media (max-width: 1230px) {
          .header-menu-wrapper {
            width: 100%;
          }
        }

        @media (max-width: 720px) {
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
            font-weight: 400;
          }

          .header-mobile-menu-close {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #ebeef1;
            border-top: 0;
            text-transform: uppercase;
            padding: 1.5rem;
            font-size: 1.4rem;
            height: 100%;
            max-height: 75px;
            user-select: none;
          }
        }
      `}</style>
    </div>
  )
}
