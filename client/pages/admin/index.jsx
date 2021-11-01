/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { useState } from 'react'
import axios from '../../axios/config'
import styles from '../../components/Auth.module.css'
import { useAuth } from '../../contexts/Auth.context'

export default function Admin(req, res) {
  const [password, setPassword] = useState('')
  const { checkAuth } = useAuth()
  const router = useRouter()

  async function submitHandler(e) {
    e.preventDefault()
    if (password) {
      console.log(password)
      await axios
        .post('/admin', { password }, { withCredentials: true })
        .then(() => checkAuth().then(() => router.push('/profile')))
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Admin</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.formWrapper}>
          <form onSubmit={submitHandler}>
            <div className={styles.formInner}>
              <input
                type='password'
                style={{ padding: '2rem', fontSize: '2rem' }}
                value={password}
                placeholder='Admin password'
                onChange={e => setPassword(e.target.value)}
              />
              <input type='submit' style={{ padding: '2rem', fontSize: '2rem' }} value='submit' />
            </div>
          </form>
        </section>
      </div>
    </React.Fragment>
  )
}
