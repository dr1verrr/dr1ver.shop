/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export const getProduct = async context => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.slug}`)

  return { product: res.data }
}

export default (req, res) => {
  res.status(200).json(getProduct(req.params.slug))
}
