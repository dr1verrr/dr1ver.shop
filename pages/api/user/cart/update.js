import api from '../../../../config/api'

export default async function userCartUpdate(req, res) {
  const token = req.cookies.jwt

  try {
    const response = await api.put(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, req.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.status(response.status).json({ message: 'user cart data was updated', data: response.data })
  } catch (err) {
    return res.status(err.response.data.statusCode).json({ message: err.response.data.message })
  }
}
