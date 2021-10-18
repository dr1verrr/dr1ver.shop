import React, { useEffect, useRef, useState } from 'react'
import styles from './Auth.module.css'
import axios from '../axios/config'

export default function Dashboard() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function signupHandler(e) {
    e.preventDefault()
    setFirstName(firstName.trim())
    setLastName(lastName.trim())

    try {
      await axios.post('/users/signup', { firstName, lastName, email, password })
    } catch (err) {
      console.error(err)
    }
  }

  function inputHandler(e, setState) {
    if (e.target.name !== 'username') {
      setState(e.target.value.replace(/ /g, '').trim())
    }

    if (e.target.name === 'username') {
      setState(e.target.value.replace(/ +(?= )/g, ''))
    }
  }

  return (
    <>
      <div className={styles.container}>
        <section className={styles.formWrapper}>
          <form onSubmit={signupHandler}>
            <div className={styles.formInner}>
              <input
                type='text'
                name='username'
                id='firstName'
                placeholder='Type your First Name'
                value={firstName}
                onChange={e => inputHandler(e, setFirstName)}
                required
              />
              <input
                type='text'
                name='username'
                id='lastName'
                placeholder='Type your Last Name'
                value={lastName}
                onChange={e => inputHandler(e, setLastName)}
                required
              />
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
              <input
                type='password'
                name='password2'
                id='password2'
                value={passwordConfirm}
                placeholder='Confirm your password'
                onChange={e => inputHandler(e, setPasswordConfirm)}
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
