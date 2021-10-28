import axios from 'axios'
import React, { createContext, useState } from 'react'
import router from 'next/router'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const AuthContext = createContext()

export async function getUser() {
  try {
    return await axios
      .get('/api/auth', {
        withCredentials: true,
      })
      .then(res => res.data)
  } catch (err) {
    if (err) return { status: 'SIGNED_OUT', user: null }
  }
}

export const AuthProvider = props => {
  const auth = props.myAuth || { status: 'SIGNED_OUT', user: null }

  async function login(email, password) {
    try {
      const response = await axios.post(
        `${publicRuntimeConfig.baseUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      )

      if (response) router.push('/')
    } catch (err) {
      console.error(err, 'Incorrect email or password entered')
    }
  }

  async function register({ email, password, firstName, lastName }) {
    try {
      const response = await axios.post(`${publicRuntimeConfig.baseUrl}/api/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      })

      if (response) router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  async function logout() {
    try {
      const response = await axios.delete(`${publicRuntimeConfig.baseUrl}/api/auth/logout`, {
        withCredentials: true,
      })

      if (response) router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, logout, register, login }} {...props}>
      {props.children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => React.useContext(AuthContext)
