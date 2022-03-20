/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Products from '../../components/Products'

function Category({ slug }) {
  return <Products slug={slug} />
}

export async function getServerSideProps(context) {
  return {
    props: {
      slug: context.params.slug,
    },
  }
}

export default Category
