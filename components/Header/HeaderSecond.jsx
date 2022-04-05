import React from 'react'
import HeaderMenu from './HeaderMenu'
import HeaderMenuWrapper from './HeaderMenuWrapper'
import HeaderMobileMenu from './HeaderMobileMenu'
import HeaderSecondOther from './HeaderSecondOther'

export default function HeaderSecond() {
  return (
    <div className='header-second'>
      <HeaderMenuWrapper>
        <HeaderMenu />
      </HeaderMenuWrapper>

      <HeaderSecondOther />
      <HeaderMobileMenu />
      <style jsx>{`
        .header-second {
          max-width: 93vw;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: header-second 2.5s ease;
          font-size: 1.7rem;
          font-weight: 300;
          margin: 0 auto;
        }

        @keyframes header-second {
          0% {
            opacity: 0;
          }

          75% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @media (max-width: 1230px) {
          .header-second {
            padding-bottom: 5rem;
          }
        }

        @media (max-width: 720px) {
          .header-second {
            position: static;
            padding: 0;
            margin: 0;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
