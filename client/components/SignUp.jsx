import React, { useRef, useState } from 'react'
import styles from './Auth.module.css'
import axios from '../axios/config'

export default function SignUp() {
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState([])

  async function signupHandler(e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setIsPasswordsEqual(false)
    }
    setUsername(username.trim())

    try {
      await axios
        .post('/users/register', { username, email, password })
        .then(res => setError(res.data))
    } catch (err) {
      console.err(err)
    }
  }

  function inputHandler(e, setState) {
    if (e.target.id !== 'username') {
      setState(e.target.value.replace(/ /g, '').trim())
    }

    if (e.target.id === 'username') {
      setState(e.target.value.replace(/ +(?= )/g, ''))
    }
  }

  return (
    <>
      {!isPasswordsEqual && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            fontSize: '1.5rem',
            textAlign: 'center',
            backgroundColor: 'limegreen',
            padding: '0.5rem',
          }}
        >
          <span>passwords do not match</span>
        </div>
      )}
      <div className={styles.container}>
        <section className={styles.formWrapper}>
          {error.map(err => (
            <div
              key={Object.keys(error)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '3rem', padding: '2rem' }}>{err.message}</span>
            </div>
          ))}
          <form onSubmit={signupHandler}>
            <div className={styles.formInner}>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Type your username'
                required
                value={username}
                onChange={e => inputHandler(e, setUsername)}
              />
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                placeholder='Type your email address'
                required
                onChange={e => inputHandler(e, setEmail)}
              />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Type your password'
                value={password}
                required
                onChange={e => inputHandler(e, setPassword)}
              />
              <input
                type='password'
                name='password2'
                id='password2'
                value={passwordConfirm}
                placeholder='Confirm your password'
                required
                onChange={e => inputHandler(e, setPasswordConfirm)}
              />
              <input type='submit' value='Sign up' />
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
