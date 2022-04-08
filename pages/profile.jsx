import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../contexts/auth'
import useRequest from '../hooks/useRequest'
import { CART_UPDATE } from '../redux/types'

const Profile = () => {
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
      <div className='user'>
        {user && (
          <>
            <div>Username: {user?.username}</div>
            <div>Email: {user?.email}</div>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      <style jsx>{`
        .profile {
          background: #fff;
          font-size: 3rem;
          word-break: break-all;
          text-align: left;
        }

        .user {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 70vh;
          max-width: 750px;
          margin: 0 auto;
          padding: 2rem;
        }

        button {
          padding: 1.2rem 4rem;
          margin: 1.5rem;
          max-width: fit-content;
        }

        @media (max-width: 740px) {
          .profile {
            font-size: calc(2vw + 2vh);
          }
        }
      `}</style>
    </div>
  )
}

export default Profile
