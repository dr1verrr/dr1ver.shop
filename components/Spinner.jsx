import React from 'react'

export default function Spinner({ color, size, borderWidth }) {
  return (
    <div className='spinner'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        .lds-ring {
          display: inline-block;
          position: relative;
          width: 40px;
          height: 40px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: ${size || 38}px;
          height: ${size || 38}px;
          margin: 8px;
          border: ${borderWidth || 8}px solid ${color};
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: ${color || '#fff'} transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .spinner {
          z-index: 50;
        }
      `}</style>
    </div>
  )
}
