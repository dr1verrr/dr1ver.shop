/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion'
import fetch from 'isomorphic-fetch'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import Products from '../../components/Products'

function Category({ products }) {
  return (
    <Fragment>
      <Products products={products.products} title={products.name} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${context.params.slug}`)
  const data = await res.json()

  return {
    props: {
      products: data,
    },
  }
}

export default Category
