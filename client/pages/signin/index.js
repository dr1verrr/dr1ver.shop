/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import React, { useEffect } from 'react'
import Login from '../../components/Login'
import { useRouter } from 'next/router'

export const getServerSideProps = async ctx => {
  const { req, res } = ctx
  const { cookies } = req

  const user = JSON.parse(cookies.user)

  console.log(res)

  return { props: { user } }
}

export default function SignIn(req, res) {
  const router = useRouter()
  const { user } = req

  useEffect(() => {
    if (typeof user !== 'undefined') {
      router.replace('/dashboard')
    }
  }, [user])

  return !user ? (
    <React.Fragment>
      <Head>
        <title>E-commerce app</title>
      </Head>
      <Login />
    </React.Fragment>
  ) : null
}
