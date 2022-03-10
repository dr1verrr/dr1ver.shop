import React from 'react'
import { useAuth } from '../contexts/auth'
import useRequest from '../hooks/useRequest'

const Profile = props => {
  const { user, setUser } = useAuth()
  const logoutRequest = useRequest()

  async function logout() {
    logoutRequest('/api/logout', { method: 'get' }).then(() => setUser(null))
  }

  return (
    <div className='profile'>
      <div>Username: {user?.username}</div>
      <div>Email: {user?.email}</div>
      <button onClick={logout}>Logout</button>
      <style jsx>{`
        .profile {
          min-height: 100vh;
          background: #fff;
        }
      `}</style>
    </div>
  )
}

export default Profile
