import React, { useState } from 'react'
import { useAuth } from '../contexts/Auth.context'
import styles from './Auth.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  async function signinHandler(e) {
    e.preventDefault()
    return await login(email, password)
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
