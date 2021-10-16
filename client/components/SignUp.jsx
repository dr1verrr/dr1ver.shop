import React, { useRef, useState } from 'react'
import styles from './Auth.module.css'
import axios from '../axios/config'

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const usernameRef = useRef()
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signupHandler(e) {
    e.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setIsPasswordsEqual(false)
    }

    try {
      axios.post('/users/register', { username, email, password })
    } catch (error) {
      console.error(error)
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
          <form onSubmit={signupHandler}>
            <div className={styles.formInner}>
              <input
                type='text'
                name='username'
                id='username'
                ref={usernameRef}
                placeholder='Type your username'
                required
                onChange={e => setUsername(e.target.value)}
              />
              <input
                type='email'
                name='email'
                id='email'
                ref={emailRef}
                placeholder='Type your email address'
                required
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type='password'
                name='password'
                id='password'
                ref={passwordRef}
                placeholder='Type your password'
                required
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type='password'
                name='password2'
                id='password2'
                ref={confirmPasswordRef}
                placeholder='Confirm your password'
                required
              />
              <input type='submit' value='Sign up' />
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
