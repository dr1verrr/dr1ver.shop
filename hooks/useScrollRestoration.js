import { useEffect } from 'react'
import Router from 'next/router'

function saveScrollPos(asPath) {
  sessionStorage.setItem(`scrollPos:${asPath}`, JSON.stringify({ x: window.scrollX, y: window.scrollY }))
}

function restoreScrollPos(asPath) {
  const json = sessionStorage.getItem(`scrollPos:${asPath}`)
  const scrollPos = json ? JSON.parse(json) : undefined
  if (scrollPos) {
    window.scrollTo(scrollPos.x, scrollPos.y)
  }
}

export function useScrollRestoration(router) {
  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return
    let shouldScrollRestore = false
    window.history.scrollRestoration = 'manual'
    restoreScrollPos(router.asPath)

    const onBeforeUnload = event => {
      saveScrollPos(router.asPath)
      delete event['returnValue']
    }

    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath)
    }

    const onRouteChangeComplete = url => {
      if (shouldScrollRestore) {
        shouldScrollRestore = false
        /**
         * Calling with relative url, not expected asPath, so this
         * will break if there is a basePath or locale path prefix.
         */
        restoreScrollPos(url)
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.beforePopState(() => {
      shouldScrollRestore = true
      return true
    })

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.beforePopState(() => true)
    }
  }, [router])
}
