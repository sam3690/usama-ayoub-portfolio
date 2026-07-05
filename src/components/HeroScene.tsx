import { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei'
import { heroProgress } from '../lib/scroll'
import MacBook from './MacBook'

/** Camera drifts up and back as the lid closes. Movement is driven only by
 *  scroll progress, never by the pointer, so the laptop holds still on
 *  hover. */
function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree()
  useFrame(() => {
    const p = reduced ? 0 : heroProgress.value
    const target = new THREE.Vector3(0, 3.6 + p * 4.2, 27 - p * 3.2)
    camera.position.lerp(target, 0.07)
    camera.lookAt(0, 1.1 - p * 0.9, 0)
  })
  return null
}

function Table() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]}>
      <planeGeometry args={[90, 55]} />
      <MeshReflectorMaterial
        blur={[280, 70]}
        resolution={512}
        mixBlur={1}
        mixStrength={14}
        roughness={0.92}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0c1210"
        metalness={0.35}
        mirror={0.35}
      />
    </mesh>
  )
}

interface HeroSceneProps {
  reduced: boolean
}

export default function HeroScene({ reduced }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 3.35, 15], fov: 29 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
      
    >
      <color attach="background" args={['#0b0d10']} />
      <fog attach="fog" args={['#0b0d10', 20, 42]} />
      <CameraRig reduced={reduced} />
      <ambientLight intensity={0.22} />
      {/* Key light, cool emerald cast from the upper left like the portrait */}
      <spotLight
        position={[-9, 12, 9]}
        angle={0.4}
        penumbra={1}
        intensity={220}
        color="#bff2dd"
      />
      {/* Gold rim from behind right */}
      <pointLight position={[7, 5, -7]} intensity={40} color="#059669" />
      <Suspense fallback={null}>
        <MacBook reduced={reduced} />
        <Table />
        <Environment resolution={256}>
          <Lightformer
            intensity={1.6}
            position={[0, 9, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[12, 12, 1]}
            color="#eafff5"
          />
          <Lightformer
            intensity={1.4}
            position={[-9, 3, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[9, 3, 1]}
            color="#059669"
          />
          <Lightformer
            intensity={0.9}
            position={[9, 4, -3]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[7, 3, 1]}
            color="#059669"
          />
        </Environment>
        <ContactShadows position={[0, -0.21, 0]} opacity={0.65} scale={26} blur={2.1} far={4} />
      </Suspense>
    </Canvas>
  )
}
