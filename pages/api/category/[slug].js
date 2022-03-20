/* eslint-disable import/no-anonymous-default-export */
import api from '../../../config/api'

export default async function handler(req, res) {
  const { slug } = req.query

  const getProducts = async () => {
    const request = await api.get(slug === 'all' ? '/products' : `/categories/${slug}`)
    const data = request.data

    if (data) return res.status(200).json(data)
  }

  return getProducts()
}
