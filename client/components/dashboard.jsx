import { useRouter } from 'next/router'
import React from 'react'
import axios from '../axios/config'

export default function Dashboard({ userData }) {
  const { firstName, lastName, signedIn, timeCreated, email, sessionId, userTypeId, id } = userData
  const router = useRouter()

  async function logout() {
    await axios
      .delete('/api/auth/logout', { withCredentials: true })
      .then(() => router.push('/signin'))
  }

  return (
    <div
      style={{
        fontSize: '2.5rem',
      }}
    >
      <div
        style={{
          fontSize: '5rem',
          textAlign: 'center',
          backgroundColor: 'limegreen',
        }}
      >
        Welcome, {firstName + ' ' + lastName}
      </div>
      <div
        className='wrapper'
        style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>id: {id}</div>
        <div>Email: {email}</div>
        <div>Account created: {timeCreated}</div>
        <div>Last login: {signedIn}</div>
        <div>User permissions: {userTypeId === '2' ? 'user' : 'admin'}</div>
        <div>Session id: {sessionId}</div>
        <button style={{ padding: '1rem', fontSize: '2rem' }} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
