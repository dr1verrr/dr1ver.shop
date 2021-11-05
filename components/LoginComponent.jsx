import React, { useState } from 'react'
import styles from './Auth.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function LoginComponent() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/login', userData).then(() => router.reload())
    } catch (err) {
      console.log(err)
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
                type='email'
                name='identifier'
                id='email'
                value={userData.identifier}
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
              <input type='submit' value='Sign In' />
              <div style={{ fontSize: '2rem' }}>
                Want to create an account ? <Link href='/register'>Register</Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
