/* eslint-disable react/display-name */
import React, { memo } from 'react'
import mockCategories from '../data/categories.json'
import Link from 'next/link'
import FooterIcons from '../icons/social-icons'
import MadeWithIcons from '../icons/made-with'
import PaymentsIcons from '../icons/payments'

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
                <Link href='/category/[slug]' as={`/category/${item.slug}`} passHref>
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
                <Link href='/'>
                  <a className='header-logo footer-logo'>
                    <div className='header-logo-first logo'>
                      <span className='original-logo'>DR1VER</span>
                    </div>
                    <div className='header-logo-second logo'>
                      <span className='original-logo'>SHOP</span>
                    </div>
                  </a>
                </Link>
                <div className='footer-socials-logos'>
                  {FooterIcons.map(icon => (
                    <div key={icon.name} className='footer-socials-logo footer-logo'>
                      <Link href={icon.href} passHref>
                        {icon.svg}
                      </Link>
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

        .payment-method {
        }

        .label {
          color: #7a7a7c;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
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

        .footer-content {
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
          letter-spacing: 1.5px;
          padding: 2rem 0;
          flex-wrap: wrap;
        }

        .header-logo {
          display: flex;
          border: 1px solid #d6d5dc;
          max-width: fit-content;
          font-size: 2.5rem;
        }

        .logo {
          padding: 0.5rem;
        }

        .header-logo-first {
          background: #d6d5dc;
          color: #000;
        }

        .header-logo-second {
          color: #d6d5dc;
          background: #000;
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

        .header-logo {
          margin-right: 1rem;
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
