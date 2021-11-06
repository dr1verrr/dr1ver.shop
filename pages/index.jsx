import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import api from '../config/api'

function Home() {
  const [products, setProducts] = useState([])

  async function getProducts() {
    const response = await api.get('/products').then(res => setProducts(res.data))
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center', fontSize: '4rem', padding: '4rem 0' }}>All cards</div>

      <Product products={products} />
    </React.Fragment>
  )
}

export default Home
