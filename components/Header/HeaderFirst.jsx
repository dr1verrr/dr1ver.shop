import React from 'react'
import Link from 'next/link'

export default function HeaderFirst() {
  return (
    <div className='header-first'>
      <Link href='/' as='/' passHref>
        <div className='header-logo'>
          <div className='header-logo-first logo'>
            <span className='original-logo'>DR1VER</span>
          </div>
          <div className='header-logo-second logo'>
            <span className='original-logo'>SHOP</span>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .header-first {
          padding-top: 4rem;
        }

        .header-logo-first {
          color: #1d1f21;
          background-color: #fff;
        }

        .header-logo-second {
          background: transparent;
          color: #fff;
        }

        .logo {
          padding: 1.25rem;
          border: 2px solid #fff;
        }

        .logo::before {
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          background-color: #fff;
          bottom: 0;
          right: 0;
        }

        .header-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          font-size: 2.5rem;
        }

        @media (max-width: 567px) {
          .header-first {
            padding: 0;
            padding-left: 10px;
          }

          .header-logo {
          }

          .logo {
            padding: 1.25rem;
            border: 2px solid #fff;
          }

          .logo::before {
            content: '';
            width: 100%;
            height: 2px;
            position: absolute;
            background-color: #fff;
            bottom: 0;
            right: 0;
          }

          .logo {
            padding: 0.75rem;
            font-size: 2rem;
            border: 1px solid #fff;
          }

          .logo::before {
            height: 1px;
          }
        }
      `}</style>
    </div>
  )
}
