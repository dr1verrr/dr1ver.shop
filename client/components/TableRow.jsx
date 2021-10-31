import React, { useEffect, useState } from 'react'

const TableRow = ({ originalRow, children }) => {
  const [row, setRow] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    console.log(row)
  }, [row])

  useEffect(() => {
    if (mounted) setRow(originalRow)
  }, [originalRow, mounted])
  return (
    <React.Fragment>
      <tr>{mounted && children}</tr>
    </React.Fragment>
  )
}

export default TableRow
