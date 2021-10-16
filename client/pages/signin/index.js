import React from 'react'
import SignIn from '../../components/SignIn'
import Head from 'next/head'

export default function signup() {
  return (
    <React.Fragment>
      <Head>
        <title>E-commerce app</title>
      </Head>
      <SignIn />
    </React.Fragment>
  )
}
