import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../components/Button'
import ProfileCart from '../components/ProfileCart'
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

  useEffect(() => window.scrollTo({ top: 0, left: 0 }), [])

  return (
    <div className='profile'>
      <Head>
        <title>Profile — dr1ver.shop</title>
      </Head>
      <div className='user'>
        {user && (
          <>
            <section className='user-info'>
              <div className='user-name'>
                <label>Username: {''}</label>
                <span>{user?.username}</span>
              </div>

              <div className='user-email'>
                <label>Email: {''}</label>
                <span>{user?.email}</span>
              </div>

              <div className='logout'>
                <Button
                  onClick={logout}
                  style={{ margin: '2rem 0', padding: '1rem 2rem', letterSpacing: 'initial', fontSize: '1.4rem' }}
                >
                  Logout
                </Button>
              </div>
            </section>
            <ProfileCart />
          </>
        )}
      </div>
      <style jsx>{`
        .profile {
          background: #fff;
          font-size: 2rem;
          min-height: inherit;
        }

        .user {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0 auto;
          padding: 2rem 0 10rem;
        }

        .user-info {
          padding: 0 1.5rem;
        }

        .user-info span {
          word-wrap: break-all;
          font-weight: 300;
        }

        .user-info div {
          word-wrap: break-word;
        }

        button {
          padding: 1.2rem 4rem;
          max-width: fit-content;
        }
      `}</style>
    </div>
  )
}

export default Profile
