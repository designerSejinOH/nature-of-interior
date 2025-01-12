import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { ThreeEvent, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface EditableObjectProps {
  position: [number, number, number]
  size?: [number, number, number]
  color?: string
  onDragStart?: () => void
  onDragEnd?: () => void
}

export const EditableObject = ({
  position,
  size = [0.5, 0.5, 0.5],
  color = 'springgreen',
  onDragStart,
  onDragEnd,
}: EditableObjectProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [isDraggable, setIsDraggable] = useState(false)
  const dragPlaneNormal = new THREE.Vector3(0, 0, 1)
  const dragPlaneIntersectPoint = new THREE.Vector3()

  const { controls } = useThree()

  // 경계 제한 값 설정
  const BOUNDARY = 4
  const objectHalfWidth = size[0] / 2
  const objectHalfHeight = size[1] / 2

  // 위치 값을 경계 내로 제한하는 함수
  const clampPosition = (position: { x: number; y: number; z: number }) => {
    return {
      x: Math.max(-BOUNDARY + objectHalfWidth, Math.min(BOUNDARY - objectHalfWidth, position.x)),
      y: Math.max(0 + objectHalfHeight, Math.min(BOUNDARY - objectHalfHeight, position.y)), // Y축의 하한값을 0으로 설정
      z: position.z,
    }
  }

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setLongPressTimer(
      setTimeout(() => {
        setIsDraggable(true)
        setIsDragging(true)
        if (rigidBodyRef.current) {
          rigidBodyRef.current.setBodyType(1, true)
          rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
          rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
        }
        onDragStart?.()
      }, 500),
    )
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging && isDraggable && rigidBodyRef.current) {
      e.stopPropagation()
      const { ray } = e

      const currentPosition = rigidBodyRef.current.translation()
      const dragPlane = new THREE.Plane(dragPlaneNormal, -currentPosition.z)
      ray.intersectPlane(dragPlane, dragPlaneIntersectPoint)

      // 새로운 위치를 경계 내로 제한
      const newPosition = clampPosition({
        x: dragPlaneIntersectPoint.x,
        y: dragPlaneIntersectPoint.y,
        z: currentPosition.z,
      })

      rigidBodyRef.current.setTranslation(newPosition, true)
    }
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
    if (isDragging && rigidBodyRef.current) {
      rigidBodyRef.current.setBodyType(0, true)
    }
    setIsDragging(false)
    setIsDraggable(false)
    onDragEnd?.()
  }

  return (
    <RigidBody ref={rigidBodyRef} position={position} colliders='cuboid' restitution={0.2} friction={1}>
      <mesh
        onClick={() => {
          console.log('click')
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        scale={isDragging ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        onPointerOver={(e) => {
          e.stopPropagation()
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
        }}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} opacity={isDragging ? 0.5 : 1} transparent />
      </mesh>
    </RigidBody>
  )
}
