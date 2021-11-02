import React, { useState } from 'react'
import styles from './Auth.module.css'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signinHandler(e) {
    e.preventDefault()
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
              <div style={{ fontSize: '2rem' }}>
                Want to create an account ? <Link href='/signup'>Register</Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
