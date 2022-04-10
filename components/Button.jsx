import React from 'react'

const Button = ({ onClick, children, style }) => {
  return (
    <button type='button' onClick={onClick ? onClick : () => {}} style={style || {}}>
      {children && <span>{children}</span>}
      <style jsx>
        {`
          button {
            transition: opacity 0.4s ease;
            display: block;
            padding: 1.7rem 7rem;
            border-radius: 30px;
            background: #000;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            letter-spacing: 2px;
          }
          button:hover {
            opacity: 0.7;
          }

          @media (max-width: 440px) {
            button {
              font-size: 4vw;
            }
          }
        `}
      </style>
    </button>
  )
}

export default Button
