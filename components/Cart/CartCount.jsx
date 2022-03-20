import React from 'react'

export default function CartCount({ count, setCount, resetChanges, saveChanges, isChanged }) {
  const resetCount = () => {
    setCount({ ...count, value: count.old, changed: false })
  }

  const onKeyDown = e => {
    if (isChanged) {
      if (e.key === 'Escape') {
        resetCount()
        e.target.blur()
      }

      if (e.key === 'Enter' && count.value !== 0) {
        saveChanges()
        e.target.blur()
      }
    }
  }

  const countHandler = (e, btnValue) => {
    const removeExtraSpace = s => s.trim().split(/ +/).join(' ')

    const value = parseInt(removeExtraSpace(String(e.target.value)))
    let updatedCount = 0

    const updateCount = () => {
      setCount(cnt => ({ ...cnt, value: updatedCount, changed: updatedCount !== cnt.old }))
    }

    if (btnValue) {
      if (btnValue >= 90 && !updatedCount) {
        updatedCount = 90
      }

      if (btnValue >= 0 && btnValue < 90 && !updatedCount) {
        updatedCount = btnValue
      }

      if (btnValue < 0) {
        updatedCount = 0
      }

      updateCount()
    }

    if (!btnValue) {
      if (value > 90 && !updatedCount) {
        updatedCount = 90
      }

      if (value >= 0 && value < 90 && !updatedCount) {
        updatedCount = value
      }

      updateCount()
    }
  }

  return (
    <div className='counter-wrapper' changed={`${count.changed}`}>
      <button
        type='button'
        btntype='minus'
        onClick={e => countHandler(e, parseInt(count.value - 1))}
        disabled={count.value - 1 == 0}
      >
        <svg xmlns='http://www.w3.org/2000/svg'>
          <path d='M9 4v1H0V4z'></path>
        </svg>
      </button>
      <input type='text' pattern='[0-9]*' value={count.value} onChange={countHandler} onKeyDown={onKeyDown} />
      <button
        type='button'
        btntype='plus'
        onClick={e => countHandler(e, count.value + 1)}
        disabled={count.value + 1 == 91}
      >
        <svg xmlns='http://www.w3.org/2000/svg'>
          <path d='M9 4H5V0H4v4H0v1h4v4h1V5h4z'></path>
        </svg>
      </button>

      <style jsx>{`
        .counter-wrapper {
          display: flex;
          max-width: fit-content;
          border-radius: 1.5rem;
          border: 2px solid #e2e7ec;
          overflow: hidden;
        }

        button[type='button'] {
          background: none;
          border: none;
        }

        button {
          transition: 0.25s background ease, 0.25s filter ease;
          box-sizing: border-box;
          outline: none;
          background-color: transparent;
          padding: 1rem 2rem;
          border: none;
          cursor: pointer;
        }

        button[btntype='plus'] {
          border: none;
        }

        .button-counter:hover {
          background-color: #f2f3f4;
        }

        input {
          transition: background 0.3s ease;
          box-sizing: border-box;
          width: 5rem;
          text-align: center;
          outline: none;
          border: none;
          background: #e2e7ec;
          color: #555;
          font-size: 1.6rem;
          border-right: 2px solid #e2e7ec;
          border-left: 2px solid #e2e7ec;
        }

        .counter-wrapper[changed='true'] input {
          background: transparent;
          color: #333;
        }

        .counter-wrapper[changed='true'] button {
          background: #333;
        }

        .counter-wrapper[changed='true'] button svg {
          fill: #fff;
        }
        .counter-wrapper[changed='true'] {
          border: 2px solid #797b8c;
        }

        svg {
          fill: #000;
          height: 9px;
          width: 9px;
        }
      `}</style>
    </div>
  )
}
