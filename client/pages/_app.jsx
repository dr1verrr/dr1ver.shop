import React from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log(pageProps)
  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
