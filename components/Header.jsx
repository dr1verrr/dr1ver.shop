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
          <li>
            <Link href='/contacts'>Contacts</Link>
          </li>
          <li style={{ flex: 1 }}>
            <Link href='/admin/dashboard'>Admin Dashboard</Link>
          </li>
          <React.Fragment>
            <li>
              <Link href='/login' passHref>
                <button
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #fff',
                    borderRadius: '1rem',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '2.5rem',
                  }}
                >
                  Sign in
                </button>
              </Link>
            </li>
            <li>
              <Link href='/signup' passHref>
                <button
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #fff',
                    borderRadius: '1rem',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '2.5rem',
                  }}
                >
                  Sign up
                </button>
              </Link>
            </li>
            <li>
              <Link href='/admin' passHref>
                <button
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #fff',
                    borderRadius: '1rem',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '2.5rem',
                  }}
                >
                  Admin access
                </button>
              </Link>
            </li>
          </React.Fragment>
        </ul>
      </nav>
    </header>
  )
}
