import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useLayout } from '../contexts/layout'

const Modal = props => {
  const handler = useCallback(hideModal, [])
  const [pause, setPause] = useState(false)
  const timeoutRef = useRef()
  const { modal, setModal } = useLayout()

  function runTimeout() {
    clearTimeout(timeoutRef.current)
    if (modal.visible) timeoutRef.current = setTimeout(hideModal, 4000)
  }

  function hideModal() {
    setModal(prev => ({ ...prev, visible: false }))
  }

  useEffect(() => {
    return () => {
      hideModal()
      stopTimeout()
    }
  }, [])

  function stopTimeout() {
    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    if (modal.visible) {
      if (pause) stopTimeout()
      if (!pause) runTimeout()
    }
  }, [pause, modal.visible])

  return (
    <div
      className='modal'
      onMouseEnter={() => {
        setPause(true)
      }}
      onMouseLeave={() => {
        setPause(false)
      }}
      onClick={handler}
      paused={`${pause}`}
      show={`${props.show}`}
    >
      <div className='modal-button' onClick={handler}>
        <svg className='cross' xmlns='http://www.w3.org/2000/svg' style={{ fill: '#c6c9ce' }}>
          <polygon points='15,0.54 14.46,0 7.5,6.96 0.54,0 0,0.54 6.96,7.5 0,14.46 0.54,15 7.5,8.04 14.46,15 15,14.46 8.04,7.5'></polygon>
        </svg>
      </div>
      <div className='modal-content'>
        <div className='modal-header'>{props.title}</div>
        <div className='modal-body'>
          <p>{props.children}</p>
        </div>

        <div className='modal-footer'></div>
      </div>

      <div className='notification-timer' paused={`${pause}`}></div>
      <style jsx>{`
        @keyframes fade-modal {
          25% {
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
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          background: rgba(158, 161, 169, 1);
          opacity: ${props.show ? 0.1 : 0};
          color: rgba(255, 255, 255, 0.85);
          flex-direction: column;
          text-align: center;
          width: 100%;
          max-width: 340px;
          border-radius: 20px;
          position: fixed;
          bottom: 15px;
          right: 35px;
          overflow: hidden;
          visibility: ${props.show ? 'visible' : 'hidden'};
          z-index: 1500;
          font-size: 1.5rem;
          letter-spacing: 0.75px;
          pointer-events: stroke;
          animation: fade-modal 4s ease;
          animation-fill-mode: forwards;
          cursor: default;
        }

        .modal[paused='false'][show='true'] {
          opacity: 1;
        }
        .modal[paused='true'][show='true'] {
          animation: none;
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
          padding: 1.5rem;
          width: 100%;
        }

        .notification-timer {
          transition: ${props.show ? 'width 4s ease' : 'none'};
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: ${props.show ? '0%' : '100%'};
          height: 5px;
          background: #c6c9ce;
        }

        @keyframes timer {
          0% {
            width: 100%;
          }

          100% {
            width: 0%;
          }
        }

        /*.notification-timer[paused='false'] {
          animation: timer 4s ease;
          animation-fill-mode: forwards;
        }*/

        .notification-timer[paused='true'] {
          transition: 1s ease;
          width: 100%;
        }

        @media (max-width: 500px) {
          .modal {
            padding: 2rem;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
        }

        @media (max-width: 440px) {
          .modal {
            bottom: 15px;
          }
        }
      `}</style>
    </div>
  )
}

export default memo(Modal)
