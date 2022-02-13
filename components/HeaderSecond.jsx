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
          margin: 0 auto;
        }

        @media (max-width: 1170px) {
          .header-second {
            padding-bottom: 5rem;
          }
        }

        @media (max-width: 567px) {
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
