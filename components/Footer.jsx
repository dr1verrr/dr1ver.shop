/* eslint-disable react/display-name */
import React, { memo } from 'react'
import mockCategories from '../data/categories.json'
import FooterIcons from '../icons/social-icons'
import MadeWithIcons from '../icons/made-with'
import PaymentsIcons from '../icons/payments'
import Link from 'next/link'

export default function FooterWrapper() {
  return <Footer categories={mockCategories} />
}

const Footer = memo(({ categories }) => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-content-inner'>
          <ul className='footer-menu'>
            {categories?.map(item => (
              <li key={item.id} className='footer-menu-item'>
                <Link href={`/category/${item.slug}`}>
                  <a className='footer-menu-link'>
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className='footer-content-left'>
            <div className='footer-content-left-links'>
              <div className='footer-socials'>
                <Link href='/' passHref>
                  <div className='header-logo footer-logo' onClick={() => window.scrollTo({ top: 0 })}>
                    <div className='header-logo-first logo'>
                      <svg xmlns='http://www.w3.org/2000/svg' style={{ maxWidth: '112px', maxHeight: '72px' }}>
                        <defs>
                          <mask id='mask' x='0' y='0' width='100%' height='100%'>
                            <rect id='overlay' x='0' y='0' width='100%' height='100%'></rect>
                            <text
                              x='3'
                              y='40'
                              fontFamily='JetBrains Mono'
                              fontSize='27'
                              fontWeight='700'
                              fill='#000'
                              id='text'
                              className='first-logo-text'
                            >
                              DR1VER
                            </text>
                            <rect id='square-dot' width='5px' height='5px' fill='#000' x='103' y='43'></rect>
                          </mask>
                        </defs>
                        <rect id='r' x='0' y='0' width='100%' height='100%'></rect>
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
                            fill='#d6d5dc'
                            style={{ letterSpacing: '-1px', transform: 'scale(1.05, 1.2)' }}
                          >
                            SHOP
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                </Link>
                <div className='footer-socials-logos'>
                  {FooterIcons.map(icon => (
                    <div key={icon.name} className='footer-socials-logo footer-logo'>
                      <Link href={icon.href}>{icon.svg}</Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className='footer-made-with'>
                <div className='made-with-icons'>
                  {MadeWithIcons.map(icon => (
                    <div key={icon.id} className='made-with-icon footer-logo'>
                      <Link href={icon.href} passHref>
                        {icon.svg}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='footer-copyright'>
              <Link href='https://github.com/dr1verrr' passHref>
                © 2022, dr1verrr
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-content-right' style={{ paddingTop: '2rem' }}>
        <div className='email-content'>
          <div className='email-label label'>E-mail:</div>
          <div className='email'>
            <a href='mailto:darfor2107@gmail.com'>darfor2107@gmail.com</a>
          </div>
        </div>
        <div className='payment-content'>
          <div className='payment-label label'>We accept:</div>
          <div className='payment-methods'>
            {PaymentsIcons.map(icon => (
              <div key={icon.id} className='payment-method footer-logo'>
                {icon.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #0d0d0e;
          padding: 4rem;
          color: #fff;
          font-size: 1.8rem;
          display: flex;
          justify-content: space-between;
          font-weight: 300;
        }

        svg #r {
          fill: #d6d5dc;
          mask: url(#mask);
        }

        svg #overlay {
          fill: #d6d5dc;
        }

        .first-logo-text {
          display: inline-block;
          transform: scale(1.05, 1.2) translateX(0);
          letter-spacing: -1px;
        }

        .footer-content-right {
          display: flex;
          gap: 5rem;
          text-align: right;
        }

        .email:hover {
          text-decoration: underline;
        }

        .payment-methods {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
        }

        .label {
          color: #7a7a7c;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 400;
        }

        .footer-content-left-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .footer-logo {
          transition: opacity 0.25s ease;
          display: inline-block;
        }

        .footer-socials-logo {
          width: 40px;
          height: 40px;
        }

        .footer-logo:hover {
          opacity: 0.6;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-right: 3rem;
        }

        .footer-socials-logo {
          cursor: pointer;
        }

        .footer-content-inner {
          display: flex;
          flex-direction: column;
        }

        .footer-menu-link {
          padding: 0 1rem 1rem;
        }

        .footer-menu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 0;
          flex-wrap: wrap;
        }

        .header-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'JetBrains Mono';
          margin-right: 1rem;
          border: 1px solid #d6d5dc;
          cursor: pointer;
        }

        .header-logo-first {
          max-height: 72px;
        }

        .header-logo-second {
          line-height: 1.5;
          letter-spacing: 0.5px;
          font-size: 2.5rem;
          max-height: 72px;
          position: relative;
          background: transparent;
          margin-left: 5px;
        }

        .footer-menu-link span {
          position: relative;
        }

        .footer-menu-link span::before {
          transition: transform 0.4s ease;
          transform: scaleX(0);
          width: 100%;
          content: '';
          position: absolute;
          bottom: -0.25rem;
          height: 1px;
          background-color: #fff;
        }

        .footer-menu-link:hover span::before {
          transform: scaleX(1);
        }

        .footer-menu-link span::before {
          left: 0%;
        }

        .footer-copyright:hover {
          text-decoration: underline;
        }

        .made-with-icon {
          cursor: pointer;
        }

        .footer-made-with {
        }

        .made-with-icons {
          display: grid;
          grid-gap: 2rem;
          grid-auto-flow: column;
        }

        .footer-socials-logos {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 1670px) {
          .footer-content-right {
            flex-direction: column;
          }
        }

        @media (max-width: 1410px) {
          .made-with-icons {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-flow: unset;
          }

          .footer-content-left-links {
            align-items: stretch;
          }

          .footer-socials {
            flex-direction: column;
            justify-content: space-around;
          }
        }

        @media (max-width: 920px) {
          .footer-content-left-links {
            flex-direction: column;
            align-items: center;
          }

          .footer-socials {
            padding-right: 0;
            flex-direction: row;
          }
        }

        @media (max-width: 670px) {
          .footer-socials {
            flex-direction: column;
          }

          .footer-socials-logos {
            padding-top: 1rem;
          }

          .made-with-icon {
            transform: scale(0.8);
          }

          .made-with-icons {
            grid-gap: 0;
          }
        }

        @media (max-width: 620px) {
          .footer-menu {
            display: none;
          }
        }

        @media (max-width: 610px) {
          .footer {
            flex-direction: column;
          }
        }

        @media (max-width: 360px) {
          .made-with-icons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </footer>
  )
})
