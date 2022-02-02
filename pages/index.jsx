import React from 'react'
import Products from '../components/Products'
import api from '../config/api'

function Home({ products }) {
  return (
    <React.Fragment>
      <h2 style={{ textAlign: 'center', fontSize: '3.5rem', padding: '1rem 0 3rem 0', fontWeight: 400 }}>All cards</h2>

      <Products products={products} />
    </React.Fragment>
  )
}

export const getStaticProps = async ctx => {
  const response = await api.get('/products').then(res => res.data)

  return {
    props: {
      products: response,
    },
  }
}

export default Home
