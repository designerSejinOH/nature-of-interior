export const DefaultLight = () => {
  return (
    <group>
      <directionalLight
        castShadow
        position={[20, 20, 10]}
        intensity={0.8}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0}
        shadow-camera-far={150}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.2} />
      <hemisphereLight intensity={0.2} color='#ffffff' groundColor='black' />
    </group>
  )
}
