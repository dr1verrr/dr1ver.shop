import React, { useEffect, useRef, useState } from 'react'
import styles from './Auth.module.css'

export default function SignIn() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)

  function signinHandler(e) {
    const password = passwordRef.current.value
    e.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setIsPasswordsEqual(false)
      setTimeout(() => {
        setIsPasswordsEqual(true)
      }, 3000)
    }
    console.log(password)
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
            backgroundColor: 'violet',
            padding: '0.5rem',
          }}
        >
          <span>passwords do not match</span>
        </div>
      )}

      <div className={styles.container}>
        <section className={styles.formWrapper}>
          <form onSubmit={signinHandler} action='/users/signin' method='POST'>
            <div className={styles.formInner}>
              <input
                type='email'
                name='email'
                id='email'
                ref={emailRef}
                placeholder='Type your email address'
                required
              />
              <input
                type='password'
                name='password'
                id='password'
                ref={passwordRef}
                placeholder='Type your password'
                required
              />
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                ref={confirmPasswordRef}
                placeholder='Confirm your password'
                required
              />
              <input type='submit' value='Sign in' />
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
