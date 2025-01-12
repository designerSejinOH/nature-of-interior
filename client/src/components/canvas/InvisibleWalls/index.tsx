import { RigidBody } from '@react-three/rapier'
import React from 'react'

interface Props {
  size?: number
  height?: number
  debug?: boolean
}

export const InvisibleWalls = ({ size = 4, height = 4, debug = true }: Props) => {
  return (
    <>
      {/* front-left */}
      <InvisibleWall debug={debug} position={[0, height / 2, size / 2]} rotation={[0, 0, 0]} size={[size, height, 0]} />
      {/* front-right */}
      <InvisibleWall
        debug={debug}
        position={[size / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[size, height, 0]}
      />
      {/* back-left */}
      <InvisibleWall
        debug={debug}
        position={[0, height / 2, -size / 2]}
        rotation={[0, 0, 0]}
        size={[size, height, 0]}
      />
      {/* back-right */}
      <InvisibleWall
        debug={debug}
        position={[-size / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[size, height, 0]}
      />
    </>
  )
}

const InvisibleWall = ({
  position,
  rotation,
  size,
  debug,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number, number]
  debug: boolean
}) => {
  return (
    <>
      <RigidBody type='fixed' position={position} rotation={rotation} colliders='cuboid'>
        {/* DEBUG 모드에서만 보이는 mesh */}
        <mesh visible={debug}>
          <boxGeometry args={size} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
    </>
  )
}
