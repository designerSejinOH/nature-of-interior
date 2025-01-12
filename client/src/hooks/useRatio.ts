import { useEffect, useState } from 'react'

interface RatioProps {
  designedWidth?: number
  designedHeight?: number
}
export const useRatio = ({ designedWidth, designedHeight }: RatioProps) => {
  const [ratio, setRatio] = useState({
    width: 0,
    height: 0,
  })

  const pivotWidth = designedWidth || 390
  const pivotHeight = designedHeight || 844

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setRatio({
          width: window.innerWidth / pivotWidth,
          height: window.innerHeight / pivotHeight,
        })
      }

      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    } else {
      return
    }
  }, [])
  return ratio
}
