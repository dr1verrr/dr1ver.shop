/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Product from '../../components/Product'
import fetch from 'isomorphic-fetch'

export default function ProductPage({ product }) {
  return <Product product={product} />
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${context.params.slug}`)
  const data = await res.json()

  return {
    props: {
      product: data,
    },
  }
}
