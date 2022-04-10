import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../contexts/auth'
import useRequest from '../hooks/useRequest'
import { CART_UPDATE } from '../redux/types'
import { useSelector } from 'react-redux'
import CartItem from '../components/Cart/CartItem'
import TotalPrice from '../components/TotalPrice'
import Button from '../components/Button'
import { showModal } from '../redux/actions'
import Head from 'next/head'

const Profile = () => {
  const { user, setUser } = useAuth()
  const logoutRequest = useRequest()
  const dispatch = useDispatch()
  const [isHovered, setHovered] = useState(false)
  const checkoutHandler = () => dispatch(showModal('Temporary cannot accept payments :/'))

  const logout = async () => {
    await logoutRequest('/api/logout', { method: 'get' }).then(() => {
      dispatch({ type: CART_UPDATE, payload: { cartData: [] } })
      setUser(null)
    })
  }

  useEffect(() => window.scrollTo({ top: 0, left: 0 }), [])

  const { cartData, lastModified } = useSelector(state => state.cart)

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
                <Button onClick={logout} style={{ margin: '2rem 0', padding: '1rem 3rem' }}>
                  Logout
                </Button>
              </div>
            </section>

            <div className='user-cart'>
              <div className='cart-items'>
                {cartData?.map(item => (
                  <CartItem
                    product={item}
                    key={item.id + item.selected[0]}
                    lastModified={
                      lastModified && item.id == lastModified.id && item.selected === lastModified.selected
                        ? lastModified
                        : null
                    }
                  />
                ))}
              </div>
              {cartData.length ? (
                <>
                  <div
                    className='cart-total'
                    onMouseOver={() => setHovered(!isHovered)}
                    onMouseOut={() => setHovered(!isHovered)}
                  >
                    <label>Total:</label> <TotalPrice isHovered={isHovered} />
                  </div>
                  <div className='cart-checkout'>
                    <Button onClick={checkoutHandler}>CHECKOUT</Button>
                  </div>
                </>
              ) : null}
            </div>
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

        .user-cart {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          padding: 0 2rem;
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

        .user-info {
        }

        .cart-checkout {
          margin: 2rem 0;
        }

        .cart-total {
          padding-top: 2rem;
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
