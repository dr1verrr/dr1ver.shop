import Link from 'next/link'
import React from 'react'
import styles from './Header.module.css'

export default function Header({ isAuthenticated }) {
  const { navbarList, header } = styles

  return (
    <header className={header}>
      <nav className='navbar'>
        <ul className={navbarList}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li style={{ flex: 1 }}>
            <Link href='/contacts'>Contacts</Link>
          </li>
          {isAuthenticated && (
            <React.Fragment>
              <li>
                <Link href='/signin'>Sign in</Link>
              </li>
              <li>
                <Link href='/signup'>Sign up</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}
