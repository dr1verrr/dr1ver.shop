/* eslint-disable react/display-name */
import React, { memo } from 'react'
import HeaderFirst from './HeaderFirst'
import HeaderSecond from './HeaderSecond'
import categories from '../../data/categories.json'

const Header = memo(({ categories }) => {
  return (
    <header className='header'>
      <div className='container'>
        <HeaderFirst />
        <HeaderSecond />
      </div>
      <style jsx>{`
        .header {
          background: #000;
          color: #fff;
          user-select: none;
          position: relative;
        }

        .header::after {
          transition: background 200ms ease;
          display: none;
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 100%;
          background: #616161;
          z-index: 5;
          animation: init 2.5s ease;
        }

        @keyframes init {
          0% {
            opacity: 0;
          }

          80% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @media (max-width: 630px) {
          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 75px;
          }

          .header::after {
            display: block;
          }
        }
      `}</style>
    </header>
  )
})

const HeaderWrapper = () => {
  return <Header categories={categories} />
}

export default HeaderWrapper
