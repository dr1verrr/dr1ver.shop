import { useCallback, useEffect, useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'

const Modal = props => {
  const modalRef = useRef()
  const handler = useCallback(() => props.onClose(), [])

  useOnClickOutside(modalRef, handler)
  return (
    <div className='modal' onKeyDown={e => console.log(e)} ref={modalRef}>
      <div className='modal-header'>{props.title}</div>
      <div className='modal-body'>
        <p>{props.children}</p>
      </div>
      <div className='modal-footer'>
        <button className='modal-button' onClick={props.onClose} style={{ width: '100%', display: 'block' }}>
          Close
        </button>
      </div>
      <style jsx>{`
        * {
          font-size: 1.1rem;
        }

        .modal {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          margin: 0 auto;
          display: flex;
          background: rgba(255, 255, 255, 0.9);
          color: #000;
          flex-direction: column;
          justify-content: center;
          min-width: fit-content;
          width: 15rem;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          z-index: 1000;
          position: fixed;
          top: 30px;
          right: 10vw;
          opacity: ${props.show ? 1 : 0};
          visibility: ${props.show ? 'visible' : 'hidden'};
          transition: visibility 0s, opacity 0.4s linear;
        }

        @media (max-width: 480px) {
          .modal {
            top: 10px;
            right: 0;
            left: 0;
          }
        }

        .modal-button {
          padding: 0.5rem 2rem;
        }
      `}</style>
    </div>
  )
}

export default Modal
