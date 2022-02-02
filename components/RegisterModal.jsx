import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/auth'

export default function RegisterModal() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { setPopup, loadUserFromCookies } = useAuth()
  const popupRef = useRef()
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/register', userData).then(() => loadUserFromCookies().then(() => router.push('/profile')))
    } catch (err) {
      console.error(err.response?.data)
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
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          transform: 'scale(1.2)',
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
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Type your username'
          value={userData.username}
          onChange={handleChange}
          required
        />

        <input
          className='login-modal-email'
          type='email'
          name='email'
          id='email'
          value={userData.email}
          placeholder='Type your email address'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Type your password'
          value={userData.password}
          onChange={handleChange}
          required
        />
        <input type='submit' value='Sign up' />
        <div style={{ fontSize: '2rem' }} onClick={() => setPopup({ login: true, register: false })}>
          Already have an account ?
          <a href='' onClick={e => e.preventDefault()}>
            Log in
          </a>
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
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          z-index: 1000;
          width: 25vw;
          padding: 4rem 2rem 2rem 2rem;
          border-radius: 15px;
          z-index: 1001;
          color: #000;
          min-width: fit-content;
        }
      `}</style>
    </div>
  )
}
