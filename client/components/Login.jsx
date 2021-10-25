import router from 'next/router'
import React, { useState } from 'react'
import axios from '../axios/config'
import styles from './Auth.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signinHandler(e) {
    e.preventDefault()
    try {
      await axios.post('/api/auth/signin', { email, password }, { withCredentials: true })
      router.push('/')
    } catch (err) {
      console.error(err)
    }
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
