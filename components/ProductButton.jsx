import React from 'react'

export default function ProductButton({ children, isDisabled }) {
  return (
    <button type='submit' className='product-info-add-to-cart' disabled={isDisabled}>
      <span>{children}</span>
      <div className='icon product-info-add-to-cart-arrow icon__animated'>
        <svg className='arrow' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 3.7v-.1-.1-.1c0-.1-.1-.1-.1-.2l-3-3C8.7 0 8.3 0 8.1.1s-.1.6 0 .8L10.3 3H.5c-.3 0-.5.2-.5.5s.2.5.5.5h9.8L8.1 6.1c-.1.2-.1.6 0 .8.2.1.6.1.8 0l3-3c0-.1 0-.1.1-.2z'></path>
        </svg>
      </div>
      <style jsx>{`
        .product-info-add-to-cart {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.6rem;
          transition: filter 0.2s ease, transform 0.2s ease, opacity 0.25s ease;
          background-color: #fff;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 3rem;
          padding: 1.5rem 5rem;
          font-weight: 500;
          min-width: fit-content;
        }

        .product-info-add-to-cart:hover {
          filter: brightness(80%);
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

        .product-info-add-to-cart:disabled {
          opacity: 0.6;
          color: #000;
        }
        .product-info-add-to-cart:disabled:active {
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
        }

        .product-info-add-to-cart-arrow {
          margin-left: 12px;
        }
      `}</style>
    </button>
  )
}
