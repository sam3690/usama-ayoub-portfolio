import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import { heroProgress } from '../lib/scroll'
import Cli from './Cli'

const MODEL_URL = '/models/mac-draco.glb'
const HINGE_OPEN = -0.425
const HINGE_CLOSED = 1.575

interface GLTFResult {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.Material>
}

interface MacBookProps {
  reduced: boolean
}

/** The mac-draco MacBook. The lid is a hinged group whose rotation is driven
 *  by the hero scroll progress: open at rest, fully closed by the time the
 *  hero releases its pin. */
export default function MacBook({ reduced }: MacBookProps) {
  const { nodes, materials } = useGLTF(MODEL_URL) as unknown as GLTFResult
  const hinge = useRef<THREE.Group>(null)
  const screenGlow = useRef<THREE.PointLight>(null)
  const htmlWrap = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Keep the screen bezel area dark so the edges around the CLI read as
    // an off display, not the model's default texture.
    const screen = materials['screen.001']
    if (screen && 'color' in screen) {
      ;(screen as THREE.MeshStandardMaterial).color.set('#101311')
    }
  }, [materials])

  useFrame(() => {
    const p = reduced ? 0 : heroProgress.value
    // Hold the lid open for the first fifth of the pin, then close it.
    const t = THREE.MathUtils.clamp((p - 0.18) / 0.55, 0, 1)
    const eased = t * t * (3 - 2 * t)
    if (hinge.current) {
      hinge.current.rotation.x = THREE.MathUtils.lerp(HINGE_OPEN, HINGE_CLOSED, eased)
    }
    if (screenGlow.current) {
      screenGlow.current.intensity = (1 - eased) * 1.4
    }
    if (htmlWrap.current) {
      const fade = THREE.MathUtils.clamp(1 - t * 2.4, 0, 1)
      htmlWrap.current.style.opacity = String(fade)
    }
  })

  return (
    <group dispose={null}>
      <group ref={hinge} rotation-x={HINGE_OPEN} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
          <Html
            rotation-x={-Math.PI / 2}
            position={[0, 0.05, -0.09]}
            transform
            occlude
          >
            <div ref={htmlWrap} className="select-none">
              <Cli />
            </div>
          </Html>
        </group>
      </group>
      {/* Warm spill from the terminal onto the keyboard */}
      <pointLight
        ref={screenGlow}
        position={[0, 2.6, 1.8]}
        color="#d97757"
        intensity={1.4}
        distance={9}
        decay={2}
      />
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
