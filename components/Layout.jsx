import { AnimatePresence, motion } from 'framer-motion'
import { Router } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ScrollRestorer from '../providers/ScrollRestorer'
import { PROGRESS_CHANGE } from '../redux/types'

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
          margin-top: 0;
        }
      `}</style>
    </div>
  )
}
