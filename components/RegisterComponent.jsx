import React, { useState } from 'react'
import styles from './Auth.module.css'
import Link from 'next/link'
import axios from 'axios'

export default function RegisterComponent() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/register', userData).then(() => router.replace('/profile'))
    } catch (err) {
      console.error(err.response?.data)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  return (
    <>
      <div className={styles.container}>
        <section className={styles.formWrapper}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formInner}>
              <input
                type='text'
                name='username'
                placeholder='Type your username'
                value={userData.username}
                onChange={handleChange}
                required
              />

              <input
                type='email'
                name='email'
                id='email'
                value={userData.email}
                placeholder='Type your email address'
                onChange={handleChange}
                required
              />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Type your password'
                value={userData.password}
                onChange={handleChange}
                required
              />
              <input type='submit' value='Sign up' />
              <div style={{ fontSize: '2rem' }}>
                Already have an account ? <Link href='/login'>Log in</Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
