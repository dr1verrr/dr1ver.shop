import React from 'react'
import HeaderFirst from './HeaderFirst'
import HeaderSecond from './HeaderSecond'

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <HeaderFirst />
        <HeaderSecond />
      </div>
      <style jsx>{`
        .header {
          position: relative;
          background: #111113;
          color: #fff;
          min-height: 75px;
          font-size: 2rem;
        }

        @media (max-width: 567px) {
          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .header {
            border-bottom: 1px solid #616161;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
