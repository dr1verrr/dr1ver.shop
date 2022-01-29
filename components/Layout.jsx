import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/auth'
import useOnClickOutside from '../hooks/useOnClickOutside'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  const { popup, setPopup } = useAuth()
  const ifPopup = popup.login || popup.register
  const popupRef = useRef()
  const router = useRouter()
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  })

  useOnClickOutside(popupRef, () => setPopup({ login: false, register: false }))

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/login', userData).then(() => router.reload())
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  return (
    <React.Fragment>
      <Head>
        <title>dr1ver.shop</title>
      </Head>

      <div className='auth-modal' ref={popupRef}>
        <form className='login-modal-window' onSubmit={handleSubmit}>
          <input
            className='login-modal-email'
            type='email'
            name='identifier'
            id='email'
            value={userData.identifier}
            placeholder='Type your email address'
            onChange={handleChange}
            required
          />
          <input
            className='login-modal-password'
            type='password'
            name='password'
            id='password'
            placeholder='Type your password'
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input className='login-modal-submit' type='submit' value='Sign In' />
          <div style={{ fontSize: '1.2rem' }}>
            Want to create an account ? <a href=''>Register</a>
          </div>
        </form>
      </div>
      <div className='wrapper'>
        <Header />
        <main className='main'>{children}</main>
        <Footer />
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main {
          flex: 1;
          min-height: 100vh;
        }

        .login-modal-window {
          display: flex;
          flex-direction: column;
        }

        input {
          border: none;
          background-image: none;
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          border-radius: 10px;
          height: 3rem;
          padding: 0.9rem;
          margin: 10px 0;
          background: #f4f6f8;
          font-size: 1rem;
        }

        input[type='submit'] {
          width: fit-content;
          padding: 0.75rem 2rem;
          border: none;
          background: #4b4b4b;
          color: #fff;
          text-transform: uppercase;
          cursor: pointer;
          margin: 15px auto;
        }

        .auth-modal {
          transition: all 0.25s ease;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          z-index: 1000;
          width: 25vw;
          padding: 2rem;
          border-radius: 15px;
          opacity: ${ifPopup ? 1 : 0};
          visibility: ${ifPopup ? 'visible' : 'hidden'};
          z-index: 1001;
          color: #000;
          min-width: fit-content;
        }
      `}</style>

      <style jsx global>
        {`
          body {
            overflow: ${ifPopup ? 'hidden' : 'auto'};
          }

          body::after {
            transition: all 0.25s ease;
            position: absolute;
            content: '';
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: #333;
            opacity: ${ifPopup ? 0.7 : 0};
            visibility: ${ifPopup ? 'visible' : 'hidden'};
            z-index: 1000;
          }
        `}
      </style>
    </React.Fragment>
  )
}
