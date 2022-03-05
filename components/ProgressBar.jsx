import { Router } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState('')

  useEffect(() => {
    const start = () => {
      console.log('start')
      setProgress('start')
    }
    const end = () => {
      console.log('finished')
      setProgress('end')
    }

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <div className='progress-bar'>
      <div className='progress-bar-progress' active={`${progress}`}></div>
      <style jsx>{`
        .progress-bar {
          position: relative;
          z-index: 2000;
          position: fixed;
          top: 0;
          left: 0;
          opacity: 1;
          height: 1px;
          pointer-events: none;
          width: 100%;
        }

        .progress-bar-progress {
          transform-origin: bottom left;
          transform: scaleX(0);
          height: 100%;
          background: #00ffff;
          opacity: 1;
        }

        .progress-bar-progress[active='start'] {
          animation: progress-start 0.5s ease;
          transform: scaleX(0.4);
        }

        .progress-bar-progress[active='end'] {
          animation: progress-end 1s ease;
        }

        @keyframes progress-start {
          0% {
            opacity: 0;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes progress-end {
          0% {
            transform: scaleX(0.4);
          }

          75% {
            opacity: 1;
            transform: scaleX(1);
          }

          100% {
            transform: scaleX(1);
            opacity: 0;
          }
        }

        @media (max-width: 620px) {
          .progress-bar {
            height: 2px;
          }
        }
      `}</style>
    </div>
  )
}
