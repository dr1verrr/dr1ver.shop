/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  const { navbarList, header } = styles

  return (
    <header className={header}>
      <nav className='navbar'>
        <ul className={navbarList}>
          <li>
            <Link href='/' passHref={true}>
              <img src='/logo.svg' alt='logo' style={{ cursor: 'pointer' }} />
            </Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li style={{ flex: 1 }}>
            <Link href='/contacts'>Contacts</Link>
          </li>
          <React.Fragment>
            <li>
              <Link href='/signin'>
                <a
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #fff',
                    borderRadius: '1rem',
                  }}
                >
                  Sign in
                </a>
              </Link>
            </li>
            <li>
              <Link href='/signup'>
                <a
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #fff',
                    borderRadius: '1rem',
                  }}
                >
                  Sign up
                </a>
              </Link>
            </li>
          </React.Fragment>
        </ul>
      </nav>
    </header>
  )
}
