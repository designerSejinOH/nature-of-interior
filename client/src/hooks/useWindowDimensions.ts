import { useState, useEffect } from 'react'

interface Size {
  width: any
  height: any
}

function getWindowDimensions(): Size {
  let width
  let height
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
  }
  return {
    width,
    height,
  }
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<Size>(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { ...windowDimensions, isMobile: windowDimensions.width <= 850 }
}
