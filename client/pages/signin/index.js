import Head from 'next/head'
import React from 'react'
import SignIn from '../../components/SignIn'

export const getServerSideProps = async ctx => {
  const { req, res } = ctx
  const { cookies } = req

  const user = JSON.parse(cookies.user)
  return { props: { user } }
}

export default function signin(req, res) {
  console.log(req.user)
  return (
    <React.Fragment>
      <Head>
        <title>E-commerce app</title>
      </Head>
      <SignIn />
    </React.Fragment>
  )
}
