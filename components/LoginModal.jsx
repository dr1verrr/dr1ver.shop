import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/auth'
import useOnClickOutside from '../hooks/useOnClickOutside'

export default function LoginModal() {
  const { loginModal, setLoginModal } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  })
  const loginRef = useRef()

  useOnClickOutside(loginRef, () => {
    if (loginModal) setLoginModal(false)
  })

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
    <div className='login-modal-wrapper'>
      <form className='login-modal-window' onSubmit={handleSubmit} ref={loginRef}>
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
      <style jsx>{`
        .login-modal-wrapper {
          position: absolute;
          top: 50px;
          transition: all 0.25s linear;
          visibility: ${loginModal ? 'visible' : 'hidden'};
          opacity: ${loginModal ? 1 : 0};
        }

        .login-modal-window {
          background: #fff;
          padding: 2rem;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}
