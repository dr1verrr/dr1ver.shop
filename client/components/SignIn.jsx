import React, { useState } from 'react'
import axios from '../axios/config'
import styles from './Auth.module.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  async function signinHandler(e) {
    e.preventDefault()
    try {
      await axios.post('/users/login', { email, password }).then(res => setError(res.data))
    } catch (err) {
      console.error(err)
    }

    console.log(error)
  }

  function inputHandler(e, setState) {
    if (e.target.id !== 'username') {
      setState(e.target.value.replace(/ /g, '').trim())
    }
  }

  return (
    <>
      <div className={styles.container}>
        <section className={styles.formWrapper}>
          {error &&
            error.map(err => (
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
          <form onSubmit={signinHandler}>
            <div className={styles.formInner}>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                placeholder='Type your email address'
                onChange={e => inputHandler(e, setEmail)}
                required
              />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Type your password'
                value={password}
                onChange={e => inputHandler(e, setPassword)}
                required
              />
              <input type='submit' value='Sign In' />
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
