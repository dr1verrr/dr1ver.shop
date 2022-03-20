import React from 'react'

export default function ProductButton({ children, isDisabled, progress, btnType, cart }) {
  return (
    <button type='submit' className='product-add' disabled={isDisabled} btntype={`${btnType}`} cart={`${cart}`}>
      <span>{children}</span>
      <div className='icon product-add-arrow icon__animated'>
        <svg className='arrow' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 3.7v-.1-.1-.1c0-.1-.1-.1-.1-.2l-3-3C8.7 0 8.3 0 8.1.1s-.1.6 0 .8L10.3 3H.5c-.3 0-.5.2-.5.5s.2.5.5.5h9.8L8.1 6.1c-.1.2-.1.6 0 .8.2.1.6.1.8 0l3-3c0-.1 0-.1.1-.2z'></path>
        </svg>
      </div>
      <style jsx>{`
        .product-add {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: filter 0.2s ease, transform 0.2s ease, opacity 0.25s ease;
          background-color: #fff;
          text-transform: uppercase;
          border-radius: 3rem;
          padding: 1.5rem 5rem;
          min-width: fit-content;
          letter-spacing: 2px;
        }

        .product-add[cart='true'] {
          text-transform: none;
          color: #fff;
          background: #333;
          white-space: nowrap;
          border-radius: 7px;
          padding: 1rem;
          width: 100%;
          font-weight: 500;
        }

        .product-add[cart='true'] .icon {
          display: none;
        }
        .product-add[cart='true'] span {
          font-size: 1.2rem;
        }

        .product-add[btntype='cart-changes-reset'] {
          background: transparent;
          border: 1px solid #333;
          color: #333;
        }

        .product-add span {
          font-size: 1.5rem;
        }

        .product-add:hover {
          opacity: 0.8;
        }

        @keyframes button-disabled {
          0% {
            transform: rotate(0deg);
          }

          25% {
            transform: rotate(5deg);
          }

          50% {
            transform: rotate(0deg);
          }

          75% {
            transform: rotate(-5deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        .product-add:disabled {
          opacity: 0.6;
          color: #000;
        }
        .product-add:disabled:active {
          animation: button-disabled 0.1s ease;
        }
        button {
          outline: none;
          padding: 2rem;
          border: none;
          cursor: pointer;
        }

        .icon .arrow {
          width: 12px;
          height: 7px;
          opacity: ${progress ? 0 : 1};
        }

        .product-add-arrow {
          margin-left: 12px;
        }
      `}</style>
    </button>
  )
}
