/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import router, { useRouter } from 'next/router'
import React from 'react'
import Login from '../../components/Login'

export default function SignIn(req, res) {
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>E-commerce app</title>
      </Head>
      <Login />
    </React.Fragment>
  )
}
