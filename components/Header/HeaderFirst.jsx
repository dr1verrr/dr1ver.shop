import React, { useEffect } from 'react'
import { useState, useLayoutEffect } from 'react'
import Link from 'next/link'

export default function HeaderFirst() {
  const [animation, setAnimation] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimation(false)
    }, 2500)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className='header-first'>
      <div className='leftStrip strip'></div>
      <Link href='/' passHref>
        <div className='header-logo' animate={`${animation}`}>
          <div className='header-logo-first logo'>
            <svg xmlns='http://www.w3.org/2000/svg' style={{ maxWidth: '112px', maxHeight: '72px' }}>
              <defs>
                <mask id='mask' x='0' y='0' width='100%' height='100%'>
                  <rect id='overlay' x='0' y='0' width='100%' height='100%' />
                  <text
                    x='3'
                    y='40'
                    fontFamily='JetBrains Mono'
                    fontSize='27'
                    fontWeight='700'
                    fill='#000'
                    className='first-logo-text'
                    id='text'
                  >
                    DR1VER
                  </text>
                  <rect id='square-dot' width='5px' height='5px' fill='#000' x='103' y='43' />
                </mask>
              </defs>

              <rect id='r' x='0' y='0' width='100%' height='100%' />
            </svg>
          </div>
          <div className='header-logo-second logo'>
            <svg xmlns='http://www.w3.org/2000/svg' style={{ maxWidth: '72px', maxHeight: '72px' }}>
              <g>
                <text
                  x='3'
                  y='40'
                  fontFamily='JetBrains Mono'
                  fontSize='27'
                  fontWeight='700'
                  fill='#fff'
                  style={{ letterSpacing: '-1px', transform: 'scale(1.05, 1.2)' }}
                >
                  SHOP
                </text>
              </g>
            </svg>
          </div>
        </div>
      </Link>
      <div className='rightStrip strip'></div>
      <style jsx>{`
        .header-first {
          padding-top: 4rem;
          display: flex;
          align-items: flex-end;
        }

        svg #r {
          fill: #fff;
          mask: url(#mask);
        }

        svg #overlay {
          fill: #fff;
        }

        @keyframes header-logo-strip {
          0% {
            opacity: 0;
          }

          50% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes init {
          0% {
            transform: translateY(calc(50vh - 108px)) scale(0);
          }

          20% {
            transform: translateY(calc(50vh - 108px)) scale(3);
          }

          45% {
            transform: translateY(calc(50vh - 108px)) scale(3);
          }

          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes strip {
          0% {
            transform: scaleX(0);
          }

          50% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @keyframes logo-first-move {
          0% {
            opacity: 0;
            transform: translateX(50%);
          }

          50% {
            opacity: 1;
            transform: translateX(50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes logo-second-move {
          0% {
            opacity: 0;
            transform: translateX(-50%);
          }

          50% {
            opacity: 0;
            transform: translateX(-50%);
          }

          75% {
            opacity: 1;
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes logo-text {
          0% {
            transform: translateX(-150%) scale(1.05, 1.2);
          }

          50% {
            transform: translateX(-150%) scale(1.05, 1.2);
          }

          100% {
            transform: translateX(0) scale(1.05, 1.2);
          }
        }

        .header-logo-first,
        #square-dot {
          animation: logo-first-move 1s;
        }

        .header-logo-first {
          min-width: 112px;
        }

        .header-logo-second {
          min-width: 72px;
        }

        .logo {
          overflow: hidden;
          max-height: 72px;
        }

        .first-logo-text {
          display: inline-block;
          transform: scale(1.05, 1.2) translateX(0);
          animation: logo-text 1s;
          letter-spacing: -1px;
        }

        .header-logo-second {
          position: relative;
          background: transparent;
          animation: logo-second-move 1s;
          margin-left: 5px;
        }

        .header-logo-second::after,
        .header-logo-second::before {
          content: '';
          position: absolute;
          right: 0;
          width: 85%;
          height: 2px;
          background: #fff;
          animation: header-logo-strip 1s ease;
        }

        .header-logo-second::before {
          top: 0;
          left: 7px;
          width: 75%;
        }

        .header-logo-second::after {
          bottom: 0;
          width: 100%;
          left: 7px;
        }

        .logo {
           {
            /*padding: 1.25rem 1rem;*/
          }
        }

        .strip {
          width: 100%;
          height: 2px;
          background-color: #fff;
          transform-origin: bottom left;
          transform: scaleX(1);
          animation: strip 4s ease;
        }

        .rightStrip {
          transform-origin: bottom right;
        }

        .header-logo {
          z-index: 1500;
          animation-iteration-count: 1;
          transform: translate(0, 0);
          animation: init 2.5s;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          font-size: 2.5rem;
          font-family: 'JetBrains Mono';
        }

        .header-logo[animate='false'] {
          z-index: 300;
        }

        .logo span {
          letter-spacing: 2px;
        }

        @keyframes init-mobile {
          0% {
            transform: translate(calc(50vw - 10px), calc(50vh + 55px)) scale(0);
          }

          25% {
            transform: translate(calc(50vw - 10px), calc(50vh + 55px)) scale(2.2);
          }

          50% {
            transform: translate(calc(50vw - 10px), calc(50vh + 55px)) scale(2.2);
          }

          100% {
            transform: translate(0) scale(1);
          }
        }

        @keyframes init-mobile-1 {
          0% {
            transform: translate(calc(50vw - 40px), calc(50vh + 72px)) scale(0);
          }

          25% {
            transform: translate(calc(50vw - 40px), calc(50vh + 72px)) scale(2);
          }

          50% {
            transform: translate(calc(50vw - 40px), calc(50vh + 72px)) scale(2);
          }

          100% {
            transform: translate(0) scale(1);
          }
        }

        @media (max-width: 630px) {
          .header-logo {
            animation: init-mobile 2.5s;
          }

          .header-first {
            transform: scale(0.7);
            margin-left: -25px;
            padding: 0;
            padding-left: 10px;
          }
        }

        @media (max-width: 400px) {
          .header-logo {
            animation: init-mobile-1 2.5s;
          }
        }

        @media (max-width: 420px) {
          .header-logo {
            font-size: 1.6rem;
          }
        }

        .logo {
        }
      `}</style>
    </div>
  )
}
