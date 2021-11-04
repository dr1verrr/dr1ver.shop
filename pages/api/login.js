import axios from 'axios'

export default async function handler(req, res) {
  const { password, identifier } = req.body

  try {
    const postRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
      identifier,
      password,
    })

    res.cookie('jwt', postRes?.data?.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    res.status(200).end()
  } catch (e) {
    console.error(e)
    res.status(400).send(e.response.data?.message[0]?.messages[0])
  }
}
