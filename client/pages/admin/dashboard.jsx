import React, { useEffect, useState } from 'react'
import axios from '../../axios/config'
import TableColumn from '../../components/TableColumn'
import TableRow from '../../components/TableRow'
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
    //console.log(products)
  }, [products])

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
      <form onSubmit={submitHandler}>
        <table className='table'>
          <thead>
            <tr>
              <td>#</td>
              {products[0] &&
                productKeys.map(item => {
                  return <td key={item}>{item}</td>
                })}
            </tr>
          </thead>
          <tbody>
            {/* TODO: create smart component(for each row special component and also for each column) */}
            {products &&
              products.map((item, index) => {
                return (
                  <TableRow originalRow={item} key={item.product_id}>
                    <td>{index}</td>
                    {Object.values(item).map((data, index) => {
                      return (
                        <TableColumn
                          key={data}
                          originalColumn={data}
                          inputProps={{ productKeys, index }}
                        />
                      )
                    })}
                  </TableRow>
                )
              })}
          </tbody>
        </table>
        <style jsx>
          {`
            .table {
              width: 100%;

              margin-bottom: 20px;

              border: 1px solid #dddddd;

              border-collapse: collapse;
            }

            .table th {
              font-weight: bold;

              padding: 5px;

              background: #efefef;

              border: 1px solid #dddddd;
            }

            .table td {
              border: 1px solid #dddddd;

              padding: 5px;
            }
          `}
        </style>
      </form>
    </div>
  ) : null
}
