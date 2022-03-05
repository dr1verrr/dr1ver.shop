/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export const getProduct = async context => {
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.slug}`)

  const getCategories = async () => {
    const categoriesArr = []
    const slugsArr = product?.data.categories

    for (let index = 0; index < slugsArr.length; index++) {
      if (categoriesArr.length >= 3) {
        break
      }
      console.log(categoriesArr.length)
      const categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slugsArr[index].slug}`)
      categoriesArr.push(categories.data.products)
      if (categories.data.products.length >= 5) {
        break
      }
    }

    return categoriesArr
  }

  const categories = await getCategories()

  return { product: product.data, categories }
}

export default (req, res) => {
  res.status(200).json(getProduct(req.params.slug))
}
