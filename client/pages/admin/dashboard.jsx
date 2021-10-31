import React, { useEffect, useState } from 'react'
import axios from '../../axios/config'
import Table from '../../components/Table'
import { useAuth } from '../../contexts/Auth.context'

export default function AdminDashboard(req, res) {
  const [mounted, setMounted] = useState(false)
  const [products, setProducts] = useState([])
  const [productKeys, setProductKeys] = useState([])
  const { auth } = useAuth()

  async function submitHandler(e) {
    e.preventDefault()
  }

  async function getProducts() {
    await axios.get('/api/products').then(res => {
      setProducts(res.data)
      setProductKeys(Object.keys(res.data[0]))
    })
  }

  useEffect(() => {
    if (auth?.user?.userTypeId === 1) {
      setMounted(true)
    }
  }, [auth])

  useEffect(() => {
    if (mounted) getProducts()
  }, [mounted])

  return mounted ? (
    <div className='container'>
      <Table products={products} productKeys={productKeys} />
    </div>
  ) : null
}
