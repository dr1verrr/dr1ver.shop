import { useRouter } from 'next/router'
import React, { memo, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../contexts/auth'
import useOnClickOutside from '../hooks/useOnClickOutside'
import useRequest from '../hooks/useRequest'
import { AUTH_MODAL_UPDATE } from '../redux/types'

const AuthModal = memo(({ authModal }) => {
  const { loadUserFromCookies } = useAuth()
  const popupRef = useRef()
  const router = useRouter()
  const sendAuthData = useRequest()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    identifier: '',
    username: '',
    password: '',
    email: '',
  })

  useOnClickOutside(popupRef, () => {
    if (authModal.visible) dispatch({ type: AUTH_MODAL_UPDATE, payload: { visible: false } })
  })

  async function handleSubmit(e) {
    e.preventDefault()

    sendAuthData({ method: 'post', url: `${authModal.login ? '/api/login' : '/api/register'}`, data: userData })
      .then(() => loadUserFromCookies())
      .then(() => {
        dispatch({ type: AUTH_MODAL_UPDATE, payload: { visible: false } })
        router.push('/profile')
      })
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
        onClick={() => dispatch({ type: AUTH_MODAL_UPDATE, payload: { visible: false } })}
      >
        <polygon
          points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'
          className='jsx-2976184323'
        ></polygon>
      </svg>
      <form className='login-modal-window' onSubmit={handleSubmit}>
        {authModal.register && (
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
        {authModal.login && (
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
        {authModal.register && (
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
        <input className='login-modal-submit' type='submit' value={authModal.login ? 'Sign in' : 'Sign up'} />
        <div
          style={{ fontSize: '1.8rem' }}
          onClick={() =>
            dispatch({ type: AUTH_MODAL_UPDATE, payload: { login: !authModal.login, register: !authModal.register } })
          }
        >
          {authModal.login ? 'Want to create an account ? ' : 'Already registered ? '}
          <span style={{ cursor: 'pointer' }}>{authModal.login ? 'Register' : 'Login'}</span>
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
          opacity: ${authModal.visible ? 1 : 0};
          visibility: ${authModal.visible ? 'visible' : 'hidden'};
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
})

const AuthModalWrapper = () => {
  const authModal = useSelector(state => state.ui.authModal)

  return <AuthModal authModal={authModal} />
}

export default AuthModalWrapper
