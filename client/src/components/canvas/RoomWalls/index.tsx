import React, { useRef } from 'react'
import { PlaneGeometry, Vector3 } from 'three'
import { usePlane } from '@react-three/cannon'

interface Props {
  color?: string
  wallWidth?: number
  offset?: number
  [x: string]: any
}

export function RoomWalls({ color = 'rgba(163,226,250, 1)', wallWidth = 4, offset = 0.1, ...rest }: Props) {
  const walls = [0, 1, 2].map((value, index) => {
    const wallPosition: [number, number, number] = [0, wallWidth / 2 + offset, 0]
    wallPosition[value] += -wallWidth / 2

    return <Wall key={'wall-' + index} position={wallPosition} index={value} wallColor={color} wallWidth={wallWidth} />
  })

  return <group {...rest}>{walls}</group>
}

interface WallProps {
  position: [number, number, number]
  index: number
  wallColor: string
  wallWidth: number
}
function Wall({ position, index, wallColor, wallWidth }: WallProps) {
  const rotation: [number, number, number] = [0, 0, 0]

  if (index == 0) {
    rotation[1] = Math.PI / 2
  } else if (index == 1) {
    rotation[0] = -Math.PI / 2
  } else if (index == 2) {
    rotation[2] = Math.PI / 2
  }

  const [ref] = usePlane(() => ({
    rotation: rotation,
    position: position,
    args: [wallWidth, wallWidth],
    mass: 10,
    type: 'Static',
    debug: true,
  }))
  return (
    <mesh
      receiveShadow
      // @ts-ignore
      ref={ref}
    >
      <planeGeometry args={[wallWidth, wallWidth]} />
      <meshStandardMaterial transparent opacity={0} color={wallColor} />
    </mesh>
  )
}
