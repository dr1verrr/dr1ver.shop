import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../contexts/auth'
import useRequest from '../hooks/useRequest'
import { CART_UPDATE } from '../redux/types'

const Profile = props => {
  const { user, setUser } = useAuth()
  const logoutRequest = useRequest()
  const dispatch = useDispatch()

  const logout = async () => {
    await logoutRequest('/api/logout', { method: 'get' }).then(() => {
      dispatch({ type: CART_UPDATE, payload: { cartData: [] } })
      setUser(null)
    })
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
