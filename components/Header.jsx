import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth'
import { useCart } from '../contexts/cart'
import { useLayout } from '../contexts/layout'
import categories from '../data/categories.json'

function Header() {
  function getTotal(state) {
    let value = 0
    if (state == undefined) return

    if (state) {
      for (let index = 0; index < state.length; index++) {
        value += state[index].price * state[index].count
      }
    }

    return value.toFixed(2)
  }

  const [total, setTotal] = useState(0)
  const { isAuthenticated } = useAuth()
  const { setPopup, setCartVisible, menuVisible, setMenuVisible } = useLayout()
  const { cartData } = useCart()

  function profileHandler() {
    if (isAuthenticated) {
      router.push('/profile')
    } else {
      setPopup(prev => ({ ...prev, login: !prev.login }))
    }
  }

  useEffect(() => {
    setTotal(getTotal(cartData))
    if (cartData && !cartData.length) setTotal('')
  }, [cartData])

  return (
    <header className='header'>
      <div className='container'>
        <div className='header-first'>
          <Link href='/' passHref>
            <div className='header-logo'>
              <div className='header-logo-first logo'>
                <span className='original-logo'>DR1VER</span>
                <span className='logo-mobile'>D</span>
              </div>
              <div className='header-logo-second logo'>
                <span className='original-logo'>SHOP</span>
                <span className='logo-mobile'>S</span>
              </div>
            </div>
          </Link>
        </div>
        <div className='header-second'>
          <div className='header-menu-wrapper'>
            <div className='header-mobile-menu-close' onClick={() => setMenuVisible(false)}>
              Hide menu
            </div>
            <div className='header-menu'>
              {categories?.map(category => (
                <div key={category.id} className='header-menu-category' onClick={() => setMenuVisible(false)}>
                  <Link href={`/category/${category.slug}`}>
                    <a className='header-menu-link'>
                      <span>{category.name?.toUpperCase()}</span>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className='header-second-other'>
            <div className='header-account-icon icon' onClick={profileHandler}>
              <svg xmlns='http://www.w3.org/2000/svg'>
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
            </div>

            <div className='header-cart icon' onClick={() => setCartVisible(true)}>
              <svg xmlns='http://www.w3.org/2000/svg'>
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
            </div>
            <div className='header-cart-total-cost'>{`${total || ''} USD` || 'USD'}</div>
          </div>
          <div className='icon header-mobile-menu-icon icon__animated' onClick={() => setMenuVisible(true)}>
            <div className='menu-wrapper'>
              <svg className='menu' xmlns='http://www.w3.org/2000/svg' viewBox=''>
                <path d='M36,2H0V0h36V2z M36,18H0v2h36V18z M36,9H0v2h36V9z'></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
          .header {
            position: relative;
            z-index: 1000;
            background: #111113;
            color: #fff;
            min-height: 75px;
            font-size: 1.9rem;
          }

          .header-account-icon {
            position: relative;
          }

          .header-mobile-menu-close {
            display: none;
          }

          .header-first {
            padding-top: 4rem;
          }

          .header-second {
            max-width: 93vw;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            padding-right: 15px;
          }

          .header-mobile-menu-icon {
            display: none;
          }



          @media(max-width: 1170px) {
            .header-second {
              padding-bottom: 5rem;
            }

            .header-second-other {
              bottom: 0;
              right: 0!important;
              margin-right: 1rem;
            }

          }

          @media(max-width: 1170px) {
            .header-menu {
              width: 100%;
            }

            .header-menu-wrapper {
              width: 100%;
            }
          }

          @media(max-width: 567px) {
          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .header-first {
            padding: 1.5rem;
          }

          .header-mobile-menu-close {
            display: block;
            text-align: center;
            background: #000;
            cursor: pointer;
            color: #fff;
            padding: 1.5rem;
          }

          .header-menu-wrapper {
            display: ${menuVisible ? 'block' : 'none'};
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1500;
            width: fit-content;
            background: #fff;
            color: #000;
            width: 280px;
            font-size: 1.5rem;
          }

          .header-menu {
            display: block !important;
            overflow-y: auto;
          }

          .header-menu-link {
            padding: 1.5rem !important;
          }

          .header-menu-category {
            border-bottom: 1px solid #dfdfdf;
            overflow-x: auto;
          }

          .header-second {
            position: static !important;
          }

          .header {
            position: static !important;
          }


          .header {
            border-bottom: 1px solid #616161;
            min-height: 0;
          }

          .icon {
          }

          .icon svg {
          }

          .header-cart-total-cost {
            display: none;
          }

          .logo {
            padding: 0.75rem !important;
            font-size: 2rem;
            border: 1px solid #fff !important;
          }

          .header-second {
            padding: 0;
            margin: 0;
            align-items: center !important ;
            justify-content: center;
          }

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
            height: 20px ;
          }

          .logo::before {
            height: 1px !important;
          }

          .header-menu {
            flex-direction: column;
          }

          .header-second-other {
            position: static!important;
          }


          }

          .header-menu {
            display: flex;
            height: 100%;
            gap: 0.75rem;
            letter-spacing: 0.1rem;
            justify-content: space-between;
            align-items: center;
          }

          .header-menu-category {

          }

          .header-menu-link {
            display: block;
            padding: 2.25rem 0;
            //later need to be rewrite padding to 2rem 2rem
          }

          .header-menu-link span {
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
            cursor: pointer;
            position: relative;
            font-size: 2.5rem;
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

          .icon {
            padding: 1.5rem 0;
          }

          .header-second-other {
            display: flex;
            align-items: center;
            position: absolute;
            right: 50px;
          }

          .icon {
            cursor: pointer;
            transition: filter 0.3s ease;
          }

          .icon:hover {
            filter: brightness(70%);
          }

          .icon svg {
            width: 3rem;
            height: 3rem;
            fill: #fff;
            margin: 0 0.5rem;
          }

          .cls-1 {
            fill: none;
          }

          .logo-mobile {
            display: none;
          }

          @media (max-width:567px) {
            .logo-mobile {
              display: block;
            }

            .original-logo {
              display: none;
            }
          }

        `}</style>
    </header>
  )
}

export default Header
