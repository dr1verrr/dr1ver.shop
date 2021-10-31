import React, { useEffect, useState } from 'react'

function TableColumn({ originalColumn, inputProps: { productKeys, index } }) {
  const [column, setColumn] = useState(originalColumn)

  useEffect(() => {
    console.log(column)
  }, [column])

  useEffect(() => {
    setColumn(originalColumn)
  }, [originalColumn])

  function inputHandler(e) {}

  return (
    <React.Fragment>
      <td>
        <input key={column} value={column} name={productKeys[index]} onChange={inputHandler} />
      </td>
    </React.Fragment>
  )
}

export default TableColumn
