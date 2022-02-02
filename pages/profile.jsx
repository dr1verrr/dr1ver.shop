import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '../contexts/auth'

//TODO: Rewrite Profile component. It shouldn't be a page

const Profile = props => {
  const { user, setUser } = useAuth()

  async function logout() {
    try {
      await axios.get('/api/logout').then(() => setUser(null))
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
