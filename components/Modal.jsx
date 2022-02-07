import { useCallback, useEffect, useRef, useState } from 'react'

const Modal = props => {
  const modalRef = useRef()
  const handler = useCallback(() => props.onClose(), [])
  const [pause, setPause] = useState(false)
  const [mounted, setMounted] = useState(false)
  const timeoutRef = useRef()

  useEffect(() => {
    if (!mounted && props.show) setMounted(true)
  }, [props.show])

  function runTimeout() {
    clearTimeout(timeoutRef.current)
    if (mounted) timeoutRef.current = setTimeout(() => props.onClose(), 3500)
  }

  useEffect(() => {
    return () => {
      props.onClose()
      stopTimeout()
    }
  }, [])

  function stopTimeout() {
    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    if (props.show) {
      if (pause) stopTimeout()
      if (!pause) runTimeout()
    }
  }, [pause, props.show, mounted])

  return (
    <div
      className='modal'
      ref={modalRef}
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
          min-width: fit-content;
          width: 300px;
          border-radius: 20px;
          text-align: center;
          position: fixed;
          bottom: 15px;
          right: 35px;
          overflow: hidden;
          visibility: ${props.show ? 'visible' : 'hidden'};
          z-index: 1200;
          font-size: 1.7rem;
          pointer-events: stroke;
          animation: fade-modal 3.5s linear;
          animation-fill-mode: forwards;
          cursor: default;
          padding: 2.5rem 7rem 1rem 7rem;
        }

        .modal[paused='false'][show='true'] {
          opacity: 1;
        }
        .modal[paused='true'] {
          animation: none;
          opacity: 1;
        }

        @media (max-width: 340px) {
          .modal {
            margin: 0 15px;
          }
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
        }

        .modal-content {
          flex: 1;
        }

        .notification-timer {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: ${props.show ? '100%' : '0%'};
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

        .notification-timer[paused='true'] {
          animation: none;
        }

        .notification-timer[paused='false'] {
          animation: timer 3.5s ease;
          animation-fill-mode: forwards;
        }

        @media (max-width: 480px) {
          .modal {
            left: 0;
            right: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Modal
