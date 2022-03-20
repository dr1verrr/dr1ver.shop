/* eslint-disable import/no-anonymous-default-export */
import { destroyCookie } from 'nookies'

export default async function logout(req, res) {
  destroyCookie({ res }, 'jwt', {
    path: '/',
  })

  res.setHeader('Content-Type', 'text/plain')

  res.status(200).end()
}
