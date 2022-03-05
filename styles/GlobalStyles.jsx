import React, { Fragment, memo, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MASK_HIDE } from '../redux/types'

function GlobalStyles() {
  const ui = useSelector(state => state.ui)
  const isMask = ui.authModal.visible || ui.cart || ui.menu
  const dispatch = useDispatch()
  const [animType, setAnimType] = useState('')

  useLayoutEffect(() => {
    setAnimType('init')

    const timeout = setTimeout(() => {
      setAnimType('')
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!animType && ui.menu) setAnimType('menu')
  }, [ui.menu])

  useEffect(() => {
    if (ui.cart) setAnimType('')
    if (ui.authModal.visible) setAnimType('auth')
  }, [ui])

  useEffect(() => {
    console.log(isMask)
  }, [isMask])

  return (
    <Fragment>
      <div
        className='mask'
        onClick={() => dispatch({ type: MASK_HIDE })}
        active={`${isMask}`}
        anim-type={animType}
      ></div>
      <style jsx global>
        {`
          body {
            overflow: ${isMask ? 'hidden' : 'auto'};
          }

          @keyframes fade-header {
            0% {
              filter: brightness(0.5);
            }

            100% {
              filter: brightness(1);
            }
          }

          .header {
            z-index: ${isMask ? 'auto' : 1500} !important;
            animation: ${isMask ? 'none' : 'fade-header 0.5s ease'};
          }

          @media (max-width: 630px) {
            .header-menu-wrapper {
              z-index: ${isMask ? 1500 : 'auto'} !important;
            }

            .header-second {
              z-index: auto !important;
            }
          }
        `}
      </style>
      <style jsx>{`
        .mask {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
          height: 100%;
          background: #000;
          z-index: 1000;
          pointer-events: none;
        }

        .mask[active='false'] {
          transition: opacity 0.75s linear;
          opacity: 0;
        }

        .mask[active='true'] {
          opacity: 0.5;
          pointer-events: all;
        }

        .mask[anim-type='menu'] {
          transition: opacity 0.3s ease;
        }

        @keyframes init {
          0% {
            opacity: 1;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        .mask[anim-type='init'] {
          transition: none;
          animation: init 2.5s;
          opacity: 0;
        }

        .mask[anim-type='auth'] {
          transition: opacity 0.3s ease;
        }
      `}</style>
    </Fragment>
  )
}

export default GlobalStyles
