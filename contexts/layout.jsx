import React, { createContext, memo, useContext, useMemo, useReducer, useState } from 'react'

const LayoutContext = createContext({})

export const useLayout = () => useContext(LayoutContext)

function LayoutProvider({ children }) {
  const [modal, setModal] = useReducer(modalReducer, {
    visible: false,
    title: 'title',
    message: 'message',
  })
  const [popup, setPopup] = useState({ login: false, register: false })
  const [isCartVisible, setCartVisibility] = useState(false)
  const [isMenuVisible, setMenuVisibility] = useState(false)
  const ifPopup = popup.login || popup.register

  function modalReducer(state, action) {
    switch (action.type) {
      case 'SHOW_MODAL':
        return {
          ...state,
          ...action.payload,
          visible: true,
        }

      case 'HIDE_MODAL':
        return { ...state, visible: false }

      default:
        return { ...state }
    }
  }

  const providedValues = useMemo(
    () => ({
      modal,
      setModal,
      popup,
      setPopup,
      isCartVisible,
      setCartVisibility,
      isMenuVisible,
      setMenuVisibility,
    }),
    [modal, setModal, popup, setPopup, isCartVisible, setCartVisibility, setMenuVisibility, isMenuVisible]
  )

  return (
    <LayoutContext.Provider value={providedValues}>
      <div className='wrapper'>
        <div
          className='mask'
          onClick={() => {
            if (isCartVisible) setCartVisibility(false)
            if (isMenuVisible) setMenuVisibility(false)
          }}
        ></div>
        {children}
      </div>
      <style jsx global>{`
        body {
          overflow: ${isCartVisible || isMenuVisible || ifPopup ? 'hidden' : 'auto'} !important;
        }
      `}</style>

      <style jsx>{`
        .wrapper {
          display: flex;
          position: relative;
          flex-direction: column;
          min-height: 100vh;
        }

        .main {
          flex: 1;
          min-height: 100vh;
          height: 100%;
        }

        .mask {
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: #000;
          opacity: ${isCartVisible || isMenuVisible || ifPopup ? 0.4 : 0};
          z-index: ${isCartVisible || isMenuVisible || ifPopup ? 1050 : -10};
          pointer-events: ${isCartVisible || isMenuVisible || ifPopup ? 'all' : 'none'};
        }
      `}</style>
    </LayoutContext.Provider>
  )
}

export default memo(LayoutProvider)
