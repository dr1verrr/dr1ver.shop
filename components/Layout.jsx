import { PageTransition } from 'next-page-transitions'
import React from 'react'
import { Transition } from 'react-transition-group'

export default function Layout({ children, router }) {
  return (
    <div className='layout'>
      <PageTransition timeout={300} classNames='page-transition'>
        <Transition key={router.asPath} timeout={0}>
          <main className='main'>{children}</main>
        </Transition>
      </PageTransition>
      <style jsx>{`
        .main {
          margin-top: 0;
        }

        .main {
          min-height: calc(100vh - 185px);
        }

        @media (max-width: 33px) {
          .main {
            min-height: calc(100vh - 235px);
          }
        }
        @media (max-width: 620px) {
          .main {
            min-height: calc(100vh - 75px);
          }
        }
      `}</style>
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 500ms;
        }

        .page-transition-enter-done {
          transition: opacity 500ms;
          opacity: 1;
        }

        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms ease-in-out;
        }
      `}</style>
    </div>
  )
}
