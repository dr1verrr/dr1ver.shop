import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuth } from '../contexts/auth'
import React from 'react'

const Profile = props => {
  const router = useRouter()
  const { user } = useAuth()

  async function logout() {
    try {
      await axios.get('/api/logout').then(() => router.reload())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      {user && (
        <React.Fragment>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <button onClick={logout}>Logout</button>
        </React.Fragment>
      )}
    </div>
  )
}

export default Profile
