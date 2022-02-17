import React from 'react'
import Link from 'next/link'
import { useState, useLayoutEffect } from 'react'

export default function HeaderFirst() {
  const [animation, setAnimation] = useState(true)

  useLayoutEffect(() => {
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
      <Link href='/' as='/' passHref>
        <div className='header-logo' animate={`${animation}`}>
          <div className='header-logo-first logo'>
            <span className='original-logo'>DR1VER</span>
          </div>
          <div className='header-logo-second logo'>
            <span className='original-logo'>SHOP</span>
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

        @keyframes init {
          0% {
            transform: translateY(500%) scale(0);
          }

          20% {
            transform: translateY(500%) scale(3);
          }

          45% {
            transform: translateY(500%) scale(3);
          }

          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes strip-left {
          0% {
            transform: scaleX(0) translateX(-200%);
          }

          50% {
            transform: translateX(-200%);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @keyframes strip-right {
          0% {
            transform: scaleX(0) translateX(200%);
          }

          50% {
            transform: translateX(200%);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @keyframes logo-first-move {
          0% {
            transform: translateX(50%);
          }

          50% {
            transform: translateX(50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes logo-second-move {
          0% {
            transform: translateX(-50%);
          }

          50% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes logo-text {
          0% {
            transform: translateX(-150%);
          }

          50% {
            transform: translateX(-150%);
          }

          100% {
            transform: translateX(0);
          }
        }

        .header-logo-first {
          color: #1d1f21;
          background-color: #fff;
        }

        .logo {
          overflow: hidden;
        }

        .original-logo {
          display: inline-block;
          animation: logo-text 1s;
          transform: translateX(0);
        }

        .header-logo-second {
          position: relative;
          background: transparent;
          color: #fff;
          animation: logo-second-move 1s;
        }

        .header-logo-first {
          animation: logo-first-move 1s;
        }

        .header-logo-second::after,
        .header-logo-second::before {
          content: '';
          position: absolute;
          right: 0;
          width: 85%;
          height: 2px;
          background: #fff;
        }

        .header-logo-second::before {
          top: 0;
          left: 15%;
          width: 70%;
        }

        .header-logo-second::after {
          bottom: 0;
        }

        .logo {
          padding: 1.25rem;
        }

        .strip {
          width: 100%;
          height: 2px;
          background-color: #fff;
          transform: scaleX(1);
        }

        .leftStrip {
          animation: strip-left 4s ease;
        }

        .rightStrip {
          animation: strip-right 4s ease;
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
        }

        .header-logo[animate='false'] {
          z-index: 300;
        }
        @keyframes init-mobile {
          0% {
            transform: translate(120%, 650%) scale(0);
          }

          25% {
            transform: translate(120%, 650%) scale(2);
          }

          50% {
            transform: translate(120%, 650%) scale(2);
          }

          100% {
            transform: translate(0) scale(1);
          }
        }

        @keyframes init-mobile-1 {
          0% {
            transform: translate(50%, 650%) scale(0);
          }

          25% {
            transform: translate(50%, 650%) scale(1.5);
          }

          50% {
            transform: translate(50%, 650%) scale(1.5);
          }

          100% {
            transform: translate(0) scale(1);
          }
        }

        @media (max-width: 567px) {
          .header-first {
            padding: 0;
            padding-left: 10px;
          }

          .logo {
            padding: 1.25rem;
          }

          .header-logo {
            animation: init-mobile 2.5s;
          }

          .header-logo-second::after,
          .header-logo-second::before {
            height: 1px;
          }

          .logo {
            padding: 0.75rem;
            font-size: 2rem;
          }
        }

        @media (max-width: 500px) {
          .header-logo {
            animation: init-mobile-1 2.5s;
          }
        }
      `}</style>
    </div>
  )
}
