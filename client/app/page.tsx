'use client'

import { Loading, Header } from '@/components/dom'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Box } from '@react-three/drei'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='z-50 top-0 bg-white left-0 fixed w-screen h-dvh flex items-center justify-center'>
      <Loading />
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const router = useRouter()

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-start'>
      <Header />
      <div className='w-full h-full flex justify-center items-start'>
        <View
          perf
          orbit
          className={classNames(
            'flex w-full h-full flex-col items-center justify-center transition-all duration-200 ease-in-out',
          )}
        >
          <Suspense fallback={null}>
            <ambientLight />
            <axesHelper args={[1]} />
            <Box args={[1, 1, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
              <meshStandardMaterial attach='material' color='red' />
            </Box>
          </Suspense>
        </View>
      </div>
    </div>
  )
}
