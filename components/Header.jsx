import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import categories from '../data/categories.json'

export default function Header() {
  const cartItems = useSelector(state => state)

  function getTotal(state) {
    const itemsInCart = state.filter(item => item.price > 0)
    let value = 0
    const total = itemsInCart.map(result => {
      value += result.price * result.count
    })

    return value.toFixed(2)
  }

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
              <div className='header-logo-first logo'>DR1VER</div>
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
            <Link href='/cart' className='header-cart-total-cost'>{`${cartItems ? getTotal(cartItems) : 0} USD`}</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
          .header {
            z-index: 1000;
            background: #1d1f21;
            color: #fff;
            min-height: 75px;
            font-size: 0.9rem;
          }

          .header-first {
            padding-top: 1.5rem;
          }

          .header-second {
            margin: 0 auto;
            max-width: 93vw;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          @media(max-width: 970px) {
            .header-menu {
              width: 100%;
              overflow-x: auto;
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE 10+ */
            }

            .header-second {
              justify-content: flex-end;
            }
          }

          .header-menu {
            display: flex;
            height: 100%;
            gap: 0.7rem;
            letter-spacing: 1.5px;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }

          .header-menu-category {
            position: relative;
          }

          .header-menu-link {
            display: block;
            padding: 1.25rem 0;
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
            text-align: center;
            font-weight: 400;
            cursor: pointer;
            position: relative;
            font-size: 1.35rem;
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
            padding: 0.5rem 0;
          }

          .icon {
            cursor: pointer;
            transition: filter 0.3s ease;
          }

          .icon:hover {
            filter: brightness(70%);
          }

          .icon svg {
            width: 1.85rem;
            height: 1.85rem;
            fill: #fff;
            margin: 0 0.5rem;
          }

          .cls-1 {
            fill: none;
          }

        `}</style>
    </header>
  )
}
