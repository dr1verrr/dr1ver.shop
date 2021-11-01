import React from 'react'
import { useAuth } from '../contexts/Auth.context'

export default function Dashboard() {
  const { auth, logout, checkAuth } = useAuth()
  const { firstName, lastName, signedIn, timeCreated, email, sessionId, userTypeId, id } = auth?.user

  async function handleLogout() {
    return await logout().then(checkAuth())
  }

  return (
    <div
      style={{
        fontSize: '2rem',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          textAlign: 'center',
          backgroundColor: 'limegreen',
        }}
      >
        Welcome, {userTypeId === 2 ? 'user' : 'admin' + ' ' + sessionId}
      </div>
      <div className='wrapper' style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>id: {id}</div>
        <div>Email: {email}</div>
        <div>Account created: {timeCreated}</div>
        <div>Last login: {signedIn}</div>
        <div>User permissions: {userTypeId === 2 ? 'user' : 'admin'}</div>
        <div>Session id: {sessionId}</div>
        <button
          style={{
            padding: '1rem',
            fontSize: '2rem',
            backgroundColor: '#333',
            cursor: 'pointer',
            color: '#fff',
            border: '1px solid #fff',
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
