import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/auth'
import useOnClickOutside from '../hooks/useOnClickOutside'

export default function AuthModal({ popup, setPopup }) {
  const { loadUserFromCookies } = useAuth()
  const ifPopup = popup.login || popup.register
  const popupRef = useRef()
  const router = useRouter()
  const [userData, setUserData] = useState({
    identifier: '',
    username: '',
    password: '',
    email: '',
  })

  useOnClickOutside(popupRef, () => setPopup({ login: false, register: false }))

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios
        .post(`${popup.login ? '/api/login' : '/api/register'}`, userData)
        .then(() => loadUserFromCookies().then(() => router.push('/profile')))
      setPopup({ login: false, register: false })
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  return (
    <div className='auth-modal' ref={popupRef}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='jsx-2976184323 cross'
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          cursor: 'pointer',
          maxWidth: '15px',
          maxHeight: '15px',
        }}
        onClick={() => setPopup({ login: false, register: false })}
      >
        <polygon
          points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'
          className='jsx-2976184323'
        ></polygon>
      </svg>
      <form className='login-modal-window' onSubmit={handleSubmit}>
        {popup.register && (
          <React.Fragment>
            <label htmlFor='username'>Name: </label>
            <input
              type='text'
              name='username'
              id='username'
              value={userData.username}
              onChange={handleChange}
              required
            />
          </React.Fragment>
        )}

        <label htmlFor='email'>Email: </label>
        {popup.login && (
          <input
            className='login-modal-email'
            type='email'
            name='identifier'
            id='email'
            value={userData.identifier}
            onChange={handleChange}
            required
          />
        )}
        {popup.register && (
          <input
            className='login-modal-email'
            type='email'
            name='email'
            id='email'
            value={userData.email}
            onChange={handleChange}
            required
          />
        )}
        <label htmlFor='password'>Password: </label>
        <input
          className='login-modal-password'
          type='password'
          name='password'
          id='password'
          value={userData.password}
          onChange={handleChange}
          required
        />
        <input className='login-modal-submit' type='submit' value={popup.login ? 'Sign in' : 'Sign up'} />
        <div
          style={{ fontSize: '1.8rem' }}
          onClick={() => setPopup({ login: !popup.login, register: !popup.register })}
        >
          {popup.login ? 'Want to create an account ? ' : 'Already registered ? '}
          <span style={{ cursor: 'pointer' }}>{popup.login ? 'Register' : 'Login'}</span>
        </div>
      </form>
      <style jsx>{`
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
          padding: 2rem 3rem;
          margin: 10px 0;
          background: #f4f6f8;
          font-size: 1.6rem;
          min-width: 0;
        }

        input[type='submit'] {
          height: auto;
          width: fit-content;
          padding: 1rem 2rem;
          border: none;
          background: #4b4b4b;
          color: #fff;
          text-transform: uppercase;
          cursor: pointer;
          margin: 15px auto;
        }

        .auth-modal {
          transition: opacity 0.25s ease;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          padding: 4rem;
          border-radius: 15px;
          z-index: 1200;
          opacity: ${ifPopup ? 1 : 0};
          visibility: ${ifPopup ? 'visible' : 'hidden'};
          color: #000;
          max-width: 500px;
          width: 100%;
          min-width: 300px;
        }

        .login-modal-window {
          min-width: 0;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
