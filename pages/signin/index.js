/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import React from 'react'
import Login from '../../components/Login'

export default function SignIn(req, res) {
  return (
    <React.Fragment>
      <Head>
        <title>E-commerce app</title>
      </Head>
      <Login />
    </React.Fragment>
  )
}
