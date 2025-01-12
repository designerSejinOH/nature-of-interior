'use client'

import { Loading, Header } from '@/components/dom'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Box, PresentationControls } from '@react-three/drei'
import { useWindowDimensions } from '@/hooks'
import { DefaultLight, RoomTemplate, EditableObject, InvisibleWalls } from '@/components/canvas'
import { a, useSpring, config } from '@react-spring/three'
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier'

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

  const { width: windowWidth, height: windowHeight, isMobile } = useWindowDimensions()

  return (
    <div className='w-screen h-dvh flex flex-col justify-start items-center'>
      <Header />

      <View
        perf
        orbit
        className={classNames(
          'flex w-full h-full flex-col items-center justify-center transition-all duration-200 ease-in-out touch-none',
        )}
      >
        {/* <color attach='background' args={['#f5f5f5']} />
          <fog attach='fog' args={['#f5f5f5', 30, 35]} /> */}
        <PresentationControls
          global
          zoom={1.5}
          speed={isMobile ? 10 : 1}
          // 수평 회전 제한 (-Math.PI/4 ~ Math.PI/4 = -45도 ~ 45도)
          // azimuth={[-Math.PI / 4, Math.PI / 4]}
          // 수직 회전 제한 (45도 ~ 80도)
          // 첫 번째 값을 높여서 너무 위에서 보이지 않도록
          // 두 번째 값을 낮춰서 90도(Math.PI/2)를 넘지 않도록
          polar={[0, 0]}
          rotation={[0, 0, 0]}
          config={{ mass: 2, tension: 400 }} // 회전 감도 조절
          // isDraggable={false}
        >
          <Suspense fallback={null}>
            <Physics debug gravity={[0, -5, 0]}>
              <RoomTemplate />
              <EditableObject position={[0, 2, 0]} size={[0.5, 1, 0.5]} color='green' />
              <EditableObject position={[0, 2, 0]} size={[0.5, 1, 0.5]} color='red' />
              <InvisibleWalls size={4} height={100} debug={true} />
            </Physics>
            <axesHelper args={[4]} />
            <gridHelper
              args={[4, 4]}
              position={[0, 0, 0]}
              material={
                new THREE.LineBasicMaterial({
                  color: '#00ffee',
                })
              }
            />
          </Suspense>
          <DefaultLight />
        </PresentationControls>
      </View>
    </div>
  )
}
