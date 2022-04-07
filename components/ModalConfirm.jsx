import React, { useEffect, useRef, useState } from 'react'
import useDebouncedFunction from '../hooks/useDebouncedFunction'
import useOnClickOutside from '../hooks/useOnClickOutside'
import Spinner from './Spinner'

const ModalConfirm = ({ register, close }) => {
  const ref = useRef()
  useOnClickOutside(ref, close)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const debounceError = useDebouncedFunction(() => setError(null), 10000)

  useEffect(() => {
    if (error) debounceError()
  }, [error])

  return (
    <div className='modal-confirm' ref={ref}>
      <div className='modal-close' onClick={close}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='cross'
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            cursor: 'pointer',
            maxWidth: '15px',
            maxHeight: '15px',
          }}
        >
          <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
        </svg>
      </div>
      <p className='modal-message'>
        When you click on register button you will create a temporary guest account that will be deleted in the next
        day.
      </p>
      <div className='btn-group'>
        <button
          onClick={() =>
            register(
              () => setLoading(true),
              () => setLoading(false),
              setError
            )
          }
        >
          Register
        </button>
        <button onClick={close}>Close</button>
      </div>
      {isLoading && <Spinner size={30} color='#000' borderWidth={5} />}
      <div className='error'>{error && error.data ? error?.data[0]?.messages[0]?.message : error}</div>

      <style jsx>{`
        .modal-confirm {
          width: 450px;
          padding: 4rem;
          text-align: center;
          background: #fff;
          position: absolute;
          z-index: 2000;
          pointer-events: all;
          max-width: 85vw;
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        }

        .btn-group {
          margin: 1rem 0;
        }
        .error {
          color: red;
        }

        button:first-child {
          margin-right: 1rem;
        }

        button {
          border: none;
          padding: 1rem 2rem;
          background: #000;
          color: #fff;
        }
      `}</style>
    </div>
  )
}

export default ModalConfirm
