import { useRouter } from 'next/router'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../contexts/auth'
import useDebouncedFunction from '../hooks/useDebouncedFunction'
import useRequest from '../hooks/useRequest'
import { showModal } from '../redux/actions'
import store from '../redux/store'
import { AUTH_MODAL_UPDATE, CART_UPDATE } from '../redux/types'
import { saveChanges } from '../services/Cart/saveChanges'
import Spinner from './Spinner'
import cookieCutter from 'cookie-cutter'
import { genStr } from '../helpers/generateStr'
import { genPassword } from '../helpers/generatePassword'

const AuthModal = memo(({ authModal }) => {
  const { loadUserFromCookies } = useAuth()
  const popupRef = useRef()
  const router = useRouter()
  const request = useRequest()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const debounceError = useDebouncedFunction(() => setError(null), 7500)

  const [userData, setUserData] = useState({
    identifier: '',
    username: '',
    password: '',
    email: '',
  })

  useEffect(() => {
    if (error) debounceError()
  }, [error])

  const displayModal = msg => dispatch(showModal(msg))

  const getOrCreateGuest = () => {
    const user = cookieCutter.get('user_guest')

    if (user) return JSON.parse(user)

    const baseStr = genStr()
    const secStr = genStr()
    const password = genPassword()

    const generatedUser = {
      identifier: baseStr,
      username: baseStr,
      password,
      email: `${baseStr + secStr + password}` + `@${secStr}.io`,
    }

    return [generatedUser]
  }

  async function handleSubmit(e, guest) {
    e.preventDefault()

    const getAuth = () => {
      if ((authModal.register || authModal.login) && guest) {
        if (Array.isArray(guest)) return 'register'
        return 'login'
      }

      return authModal.login ? 'login' : 'register'
    }

    try {
      const cartData = store.getState().cart.cartData
      setLoading(true)

      const authenticated = await request(getAuth() === 'register' ? '/api/register' : '/api/login', {
        method: 'post',
        data: Array.isArray(guest) ? guest[0] : guest || userData,
      })

      if (authenticated.status == 200) {
        displayModal(getAuth() === 'register' ? 'Account is registered now.' : 'Logged in.')
        setLoading(false)

        if (getAuth() === 'register' && guest) {
          cookieCutter.set('user_guest', JSON.stringify(guest[0]), { path: '/' })
        }

        const cb = type => {
          if (type === 'register') dispatch({ type: CART_UPDATE, payload: { cartData } })
          dispatch({ type: AUTH_MODAL_UPDATE, payload: { visible: false } })
          router.push('/profile')
        }

        loadUserFromCookies(getAuth()).then(isAuthenticated => {
          if (getAuth() === 'register') return saveChanges({ cartData }, () => cb('register'), isAuthenticated)
          return cb('login')
        })
      }
    } catch (err) {
      setLoading(false)
      setError(err.response.data)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  return (
    <div className='auth-modal-wrapper'>
      <div className='auth-modal' ref={popupRef}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='cross'
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
          <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
        </svg>
        <form className='login-modal-form' onSubmit={handleSubmit}>
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
          <div className='btn-group'>
            <div className='btn-group-inner'>
              <button disabled={isLoading} className='btn-submit'>
                {authModal.login ? 'Log in' : 'Register'}
              </button>
              <button
                disabled={isLoading}
                className='btn-submit btn-guest'
                type='button'
                signas='guest'
                onClick={e => handleSubmit(e, getOrCreateGuest())}
              >
                Guest mode
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            {isLoading && <Spinner size={35} color='#000' borderWidth={5} />}
          </div>
          <div className='error'>{error && error.data ? error?.data[0]?.messages[0]?.message : error}</div>
          <div>
            {authModal.login ? 'Want to create an account ? ' : 'Already registered ? '}
            <span
              className='toggle-auth'
              style={{ cursor: 'pointer' }}
              onClick={() =>
                dispatch({
                  type: AUTH_MODAL_UPDATE,
                  payload: { login: !authModal.login, register: !authModal.register },
                })
              }
            >
              {authModal.login ? 'Register' : 'Login'}
            </span>
          </div>
        </form>
      </div>
      <style jsx>{`
        .login-modal-form {
          display: flex;
          flex-direction: column;
        }

        input {
          border: none;
          background: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          border-radius: 10px;
          padding: 1.5rem 3rem;
          margin: 10px 0;
          background: #f4f6f8;
          font-size: 1.6rem;
        }

        label {
          font-size: 1.4rem;
        }

        .toggle-auth {
          color: #0000cd;
        }

        .toggle-auth:hover {
          text-decoration: underline;
        }

        .btn-group {
          display: flex;
          grid-gap: 1rem;
          margin: 2rem 0;
          align-items: center;
        }

        .btn-group-inner {
          display: flex;
          grid-gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        button {
          font-size: 1.6rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 3rem;
          background: #111113;
          color: #fff;
          text-transform: uppercase;
          cursor: pointer;
          margin: 0;
          letter-spacing: 0.5px;
        }

        button[signas='guest'] {
          background: transparent;
          border: 1px solid #ccc;
          color: #000;
        }

        .auth-modal {
          transition: opacity 0.25s ease;
          background: #fff;
          padding: 4rem;
          border-radius: 15px;
          color: #000;
          max-width: 500px;
          width: 100%;
          position: relative;
          pointer-events: all;
        }

        @media (max-width: 575px) {
          .auth-modal {
            max-width: 90vw;
          }
        }

        .error {
          color: red;
          margin-bottom: 1rem;
        }

        .auth-modal-wrapper {
          z-index: 1001;
          pointer-events: none;
          opacity: ${authModal.visible ? 1 : 0};
          visibility: ${authModal.visible ? 'visible' : 'hidden'};
          position: fixed;
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
})

const AuthModalWrapper = () => {
  const selector = useSelector(state => state.ui.authModal)
  const authModal = useMemo(() => selector, [selector])

  return <AuthModal authModal={authModal} />
}

export default AuthModalWrapper
