import React, { useEffect, useState } from 'react'

function TableColumn({
  originalColumn,
  originalRow,
  row: { state, setRow },
  inputProps: { productKeys, index },
}) {
  const [column, setColumn] = useState(originalColumn)

  useEffect(() => {
    setColumn(originalColumn)
  }, [originalColumn])

  function handleChange(e) {
    setColumn(e.target.value)
  }

  return (
    <React.Fragment>
      <td>
        <input
          key={productKeys[index]}
          value={column}
          name={productKeys[index]}
          onChange={handleChange}
        />
      </td>
    </React.Fragment>
  )
}

export default TableColumn
