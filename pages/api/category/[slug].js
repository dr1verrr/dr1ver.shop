/* eslint-disable import/no-anonymous-default-export */
import api from '../../../config/api'

export default async function handler(req, res) {
  const { slug } = req.query

  const getProducts = async () => {
    try {
      const response = await api.get(slug === 'all' ? '/products' : `/categories/${slug}`)
      const data = response.data

      console.log(data)

      return res.status(response.status).json(data)
    } catch (err) {
      console.log(err)
      res.status(err.response.data.statusCode).json({ message: err.response.data.message })
    }
  }

  return getProducts()
}
