/* eslint-disable react/display-name */
import { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MODAL_HIDE } from '../redux/types'

const Modal = memo(({ modal }) => {
  const [pause, setPause] = useState(false)
  const timeoutRef = useRef()
  const dispatch = useDispatch()
  const closeModal = () => dispatch({ type: MODAL_HIDE })
  const visible = modal.visible && !modal.override

  function runTimeout() {
    clearTimeout(timeoutRef.current)
    if (visible) timeoutRef.current = setTimeout(closeModal, 5000)
  }

  useEffect(() => {
    return () => {
      closeModal()
      stopTimeout()
    }
  }, [])

  function stopTimeout() {
    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    if (visible) {
      if (pause) stopTimeout()
      if (!pause) runTimeout()
    }
  }, [pause, visible])

  return (
    <div
      className='modal'
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onClick={closeModal}
      paused={`${pause}`}
      show={`${visible}`}
      override={`${modal.override}`}
    >
      <div className='modal-inside'>
        <div className='modal-button' onClick={closeModal}>
          <svg className='cross' xmlns='http://www.w3.org/2000/svg' style={{ fill: '#c6c9ce' }}>
            <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
          </svg>
        </div>
        <div className='modal-content'>
          <div className='modal-header'></div>
          <div className='modal-body'>
            <p>{modal.message}</p>
          </div>
          <div className='modal-footer'></div>
        </div>
        <div className='notification-timer' paused={`${pause}`}></div>
      </div>
      <style jsx>{`
        @keyframes fade-modal {
          0% {
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        .cross {
          transition: opacity 0.2s ease;
          opacity: 0;
        }

        .modal:hover .cross {
          opacity: 1;
        }

        .modal {
          bottom: 15px;
          right: 20px;
          position: fixed;
          z-index: 2000;
          width: 100%;
          max-width: 340px;
        }

        .modal[show='true'] {
          opacity: 0.1;
          animation: fade-modal 4.8s ease;
          animation-fill-mode: forwards;
          visibility: visible;
        }

        .modal[show='false'] {
          opacity: 0;
          visibility: hidden;
        }

        .modal-inside {
          position: relative;
          display: flex;
          background: rgba(158, 161, 169, 1);
          color: rgba(255, 255, 255, 0.85);
          flex-direction: column;
          text-align: center;
          border-radius: 20px;
          overflow: hidden;
          font-size: 1.5rem;
          pointer-events: stroke;
          cursor: default;
          margin: 0 1rem;
          user-select: none;
          font-weight: 300;
        }

        .modal[paused='true'][show='true'] {
          animation: none;
          opacity: 1;
        }

        .modal[paused='false'][show='true'] {
          opacity: 1;
        }

        .modal-button {
          cursor: pointer;
          position: absolute;
          top: 15px;
          right: 15px;
          max-width: 15px;
          max-height: 15px;
        }

        svg {
          width: 15px;
          height: 15px;
          transform: scale(0.75);
        }

        .modal-content {
          padding: 2rem;
          width: 100%;
        }

        .notification-timer {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          width: 100%;
          left: -50%;
          height: 5px;
          background: #c6c9ce;
        }

        @keyframes timer-strip {
          0% {
            transform: scaleX(2);
          }

          100% {
            transform: scaleX(0);
          }
        }

        .modal[show='true'] .notification-timer {
          animation: timer-strip 5s ease;
          transform: scaleX(0);
        }

        .modal[show='false'] .notification-timer {
          animation: none;
          transform: scaleX(2);
        }

        .modal .notification-timer[paused='true'] {
          animation: none;
          transform: scaleX(2);
        }

        @media (max-width: 440px) {
          .modal {
            bottom: 15px;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
})

const ModalWrapper = () => {
  const modal = useSelector(state => state.ui.modal)

  return modal ? <Modal modal={modal} /> : null
}

export default ModalWrapper
