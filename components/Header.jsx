import Link from 'next/link'
import React from 'react'
import categories from '../data/categories.json'

export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header-first'>
          <Link href='/' passHref>
            <div
              className='header-logo'
              onClick={() => {
                scrollTo({ left: 0, top: 0, behavior: 'smooth' })
              }}
            >
              <div className='header-logo-first logo'>DR!VER</div>
              <div className='header-logo-second logo'>SHOP</div>
            </div>
          </Link>
        </div>
        <div className='header-second'>
          <div className='header-menu'>
            {categories?.map(category => (
              <div key={category.id} className='header-menu-category'>
                <Link href='/category/[slug]' as={`/category/${category.slug}`}>
                  <a className='header-menu-link'>
                    <span>{category.name?.toUpperCase()}</span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className='header-second-other'>
            <div className='header-account-icon icon'>
              <Link href='/profile' onClick={e => e.preventDefault()} passHref>
                <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
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
              </Link>
            </div>
            <div className='header-cart icon'>
              <Link href='/cart' onClick={e => e.preventDefault()} passHref>
                <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
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
              </Link>
            </div>
            <a href='/cart' className='header-cart-total-cost'>{`0 USD`}</a>
          </div>
        </div>
      </div>
      <style jsx>{`
          .header {
            z-index: 1000;
            background: #1d1f21;
            color: #fff;
            min-height: 75px;
            font-size: 1.7rem;
          }

          .header-first {
            padding-top: 3rem;
          }

          .header-second {
            margin: 0 auto;
            max-width: 85vw;
            position: relative;
            padding: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          @media(max-width: 970px) {
            .header-menu {
              width: 100%;
              overflow-x: auto;
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE 10+ */
            }

            .header-second-other {
              bottom: 15px;
              right: 0!important;
            }

            .header-menu-link {
              padding: 1.5rem 0 6.5rem!important;
            }

          }

          .header-menu {
            display: flex;
            height: 100%;
            gap: 1rem;
            letter-spacing: 0.15rem;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }

          .header-menu-category {
            position: relative;
          }

          .header-menu-link {
            display: block;
            padding: 2rem 0;
          }

          .header-menu-link span {
            display: block;
            position: relative;
          }

          .header-menu-link span::before {
            transition: width 0.4s ease;
            content: '';
            position: absolute;
            bottom: -0.25rem;
            left: 50%;
            width: 0%;
            height: 1px;
            background-color: #fff;
          }

          .header-menu-link span::after {
            transition: width 0.4s ease;
            content: '';
            position: absolute;
            bottom: -0.25rem;
            right: 50%;
            width: 0%;
            height: 1px;
            background-color: #fff;
          }

          .header-menu-link:hover span::before {
            width: 50%;
          }

          .header-menu-link:hover span::after {
            width: 50%
          }

          .header-logo {
            display: flex;
            justify-content:center;
            align-items:center;
            font-size: 3rem;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            position: relative;
          }
          .header-logo-first {
            color: #1d1f21;
            background-color: #fff;
          }
          .header-logo-first::before {
            content: '',
            position: absolute,
            height: 5px;
            background-color: #fff;
            width: 100%;
          }
          .header-logo-second {
          }

          .logo {
            padding: 1rem;
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
          .header-second-other {
            display: flex;
            align-items: center;
            position: absolute;
            right: 3vw;
          }

          .icon {
            cursor: pointer;
            transition: filter 0.3s ease;
          }

          .icon:hover {
            filter: brightness(70%);
          }

          .icon svg {
            width: 32px;
            height: 32px;
            fill: #fff;
            margin: 0 1rem;
          }

          .cls-1 {
            fill: none;
          }

        `}</style>
    </header>
  )
}
