/* eslint-disable react-hooks/exhaustive-deps */
import fetch from 'isomorphic-fetch'
import React from 'react'
import Product from '../../components/Product'

function Category({ products }) {
  return (
    <React.Fragment>
      <div style={{ textAlign: 'center', fontSize: '4rem', padding: '4rem 0' }}>{products?.name}</div>
      {products && <Product products={products.products} />}
    </React.Fragment>
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
