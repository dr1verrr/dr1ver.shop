import React from 'react'

export default function Dashboard({ userData }) {
  return (
    <div style={{ fontSize: '3rem', textAlign: 'center' }}>
      <span style={{ fontSize: '5rem' }}>Welcome, user</span>
      <div>{JSON.stringify(userData, null, 2)}</div>
    </div>
  )
}
