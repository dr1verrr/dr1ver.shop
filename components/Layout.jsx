import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import ScrollRestorer from '../providers/ScrollRestorer'

export default function Layout({ children, router }) {
  return (
    <div className='layout'>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.asPath}
          initial='pageInitial'
          animate='pageAnimate'
          exit='pageExit'
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },

            pageExit: {
              opacity: 0,
            },
          }}
        >
          <main className='main'>
            <ScrollRestorer />
            {children}
          </main>
        </motion.div>
      </AnimatePresence>
      <style jsx>{`
        .main {
          position: relative;
          min-height: 100vh;
          height: 100%;
          margin-top: 0;
        }
      `}</style>
      <style jsx global>{`
        body {
          background: #000;
        }
      `}</style>
    </div>
  )
}
