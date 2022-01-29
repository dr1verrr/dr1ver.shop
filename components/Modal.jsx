import { useCallback, useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'

const Modal = props => {
  const modalRef = useRef()
  const handler = useCallback(() => props.onClose(), [props])

  useOnClickOutside(modalRef, handler)
  return (
    <div className='modal' ref={modalRef}>
      <div className='modal-button' onClick={props.onClose}>
        <svg className='cross' xmlns='http://www.w3.org/2000/svg'>
          <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
        </svg>
      </div>
      <div className='modal-content'>
        <div className='modal-header'>{props.title}</div>
        <div className='modal-body'>
          <p>{props.children}</p>
        </div>

        <div className='modal-footer'>
          {/*<button className='modal-button' onClick={props.onClose} style={{ width: '100%', display: 'block' }}>
            Close
          </button>*/}
        </div>
      </div>

      <div className='modal-progressbar'>
        <div className='modal-progressbar-line'></div>
      </div>
      <style jsx>{`
        * {
          font-size: 1.1rem;
        }

        .modal {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          margin: 0 auto;
          display: flex;
          background: rgba(255, 255, 255, 0.97);
          color: #000;
          flex-direction: column;
          min-width: fit-content;
          width: 15rem;
          border-radius: 15px;
          text-align: center;
          z-index: 1000;
          position: fixed;
          top: 30px;
          right: 10vw;
          overflow: hidden;
          opacity: ${props.show ? 1 : 0};
          visibility: ${props.show ? 'visible' : 'hidden'};
          transition: visibility 0s, opacity 0.4s linear;
        }

        .modal-footer {
        }

        .modal-button {
          cursor: pointer;
          position: absolute;
          top: 15px;
          right: 15px;
          max-width: 1rem;
          max-height: 1rem;
        }

        svg {
          width: 1rem;
          height: 1rem;
        }

        .modal-content {
          flex: 1;
          padding: 3rem;
        }

        .modal::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 5px;
          background: #a9a9a9;
          animation: progressbar 3.5s;
        }

        @keyframes progressbar {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }

        @media (max-width: 480px) {
          .modal {
            top: 10px;
            right: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Modal
