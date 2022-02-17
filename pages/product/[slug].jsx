/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Product from '../../components/Product'
import axios from 'axios'

export default function ProductPage({ product }) {
  return <Product product={product} />
}

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.slug}`)

  return {
    props: {
      product: res.data,
    },
  }
}
