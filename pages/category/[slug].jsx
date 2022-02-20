/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { Fragment } from 'react'
import Products from '../../components/Products'

function Category({ products }) {
  return <Products products={products.products} title={products.name} />
}

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${context.params.slug}`)

    return {
      props: {
        products: res.data,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export default Category
