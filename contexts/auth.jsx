import axios from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../config/api'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const privateRoutes = ['/profile']
  //const authRoutes = ['/login', '/register']
  //const authCondition = authRoutes.includes(router.pathname)
  const privateCondition = privateRoutes.includes(router.pathname)

  const [cartData, setCartData] = useLocalStorage('cart-data', [])
  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)

  function checkRoute() {
    if (privateCondition && !user) {
      router.replace('/')
    }
  }

  useEffect(checkRoute, [router.pathname, user])

  useEffect(() => {
    async function loadUserFromCookies() {
      try {
        //get jwt from cookies
        const token = await axios.get('/api/token').then(res => res.data)

        //check is jwt token valid

        if (token) {
          console.log("Got a token in the cookies, let's see if it is valid")
          api.defaults.headers.Authorization = `Bearer ${token}`
          const { data: user } = await api.get('/users/me')
          if (user) setUser(user)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    loadUserFromCookies()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        cartData,
        setCartData,
        loginModal,
        setLoginModal,
        registerModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
