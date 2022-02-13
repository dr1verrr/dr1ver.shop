import React, { Fragment, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MASK_HIDE } from '../redux/types'

function GlobalStyles() {
  const ui = useSelector(state => state.ui)
  const isMask = ui.modal || ui.authModal || ui.cart || ui.menu
  const dispatch = useDispatch()
  const [animType, setAnimType] = useState('')

  useEffect(() => {
    if (!animType && ui.menu) setAnimType('menu')
  }, [ui.menu])

  useEffect(() => {
    if (ui.modal || ui.authModal || ui.cart) {
      setAnimType('')
    }
  }, [ui])

  return (
    <Fragment>
      <div
        className='mask'
        onClick={() => dispatch({ type: MASK_HIDE })}
        active={`${isMask}`}
        anim-type={animType || ui.menu ? 'menu' : ''}
      ></div>
      <style jsx>{`
        .mask {
          will-change: pointer-events, opacity, transition;
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
          height: 100%;
          background: #000;
          z-index: 1050;
          pointer-events: ${isMask ? 'all' : 'none'};
        }

        .mask[active='false'] {
          transition: opacity 0.75s linear;
          opacity: 0;
        }

        .mask[active='true'] {
          opacity: 0.5;
        }

        .mask[anim-type='menu'] {
          transition: opacity 0.3s ease;
        }
      `}</style>
      <style jsx global>
        {`
          body {
            overflow: ${isMask ? 'hidden' : 'auto'};
          }
        `}
      </style>
    </Fragment>
  )
}

export default GlobalStyles
