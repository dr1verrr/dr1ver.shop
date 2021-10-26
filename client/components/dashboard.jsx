import React from 'react'

export default function Dashboard({ userData }) {
  const { firstName, lastName, signedIn, timeCreated, email, sessionId, userTypeId, id } = userData

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
      </div>
    </div>
  )
}
