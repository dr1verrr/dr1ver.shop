import { PageTransition } from 'next-page-transitions'
import React from 'react'
import ScrollRestorer from '../providers/ScrollRestorer'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <main className='main'>
        <ScrollRestorer />
        <PageTransition timeout={350} classNames='page-transition'>
          {children}
        </PageTransition>
      </main>
      <style jsx>{`
        .main {
          margin-top: 0;
        }

        .layout {
          min-height: 100vh;
        }
      `}</style>
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }

        .page-transition-enter-done {
          transition: opacity 300ms;
          opacity: 1;
        }

        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 350ms ease-in-out;
        }
      `}</style>
    </div>
  )
}
