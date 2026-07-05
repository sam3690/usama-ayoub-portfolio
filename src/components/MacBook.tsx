import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { heroProgress } from '../lib/scroll'
import { drawCli } from '../lib/cliTexture'
import type { CliStage } from '../lib/cliTexture'

const MODEL_URL = '/models/mac-draco.glb'
const HINGE_OPEN = -0.14
const HINGE_CLOSED = 1.575

interface GLTFResult {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.Material>
}

interface MacBookProps {
  reduced: boolean
}

/** The screen content is a WebGL texture drawn onto a canvas, not a DOM
 *  overlay: CSS-rotated DOM text blurs badly under drei's Html transform,
 *  while a real texture stays crisp at any angle. */
function useCliTexture() {
  const canvas = useMemo(() => document.createElement('canvas'), [])
  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.generateMipmaps = false
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.flipY = false
    return tex
  }, [canvas])

  const [stage, setStage] = useState(0)

  useLayoutEffect(() => {
    const stages: CliStage[] = [
      { showWelcome: false, showBanner: false, showLogin: false, caretOn: false },
      { showWelcome: true, showBanner: false, showLogin: false, caretOn: false },
      { showWelcome: true, showBanner: true, showLogin: false, caretOn: false },
      { showWelcome: true, showBanner: true, showLogin: true, caretOn: true },
    ]
    drawCli(canvas, stages[stage])
    texture.needsUpdate = true
  }, [stage, canvas, texture])

  useLayoutEffect(() => {
    const timers = [window.setTimeout(() => setStage(1), 700), window.setTimeout(() => setStage(2), 1300), window.setTimeout(() => setStage(3), 2000)]
    return () => timers.forEach(clearTimeout)
  }, [])

  return texture
}

/** The mac-draco MacBook. The lid is a hinged group whose rotation is driven
 *  by the hero scroll progress: open at rest, fully closed by the time the
 *  hero releases its pin. */
export default function MacBook({ reduced }: MacBookProps) {
  const { nodes, materials } = useGLTF(MODEL_URL) as unknown as GLTFResult
  const hinge = useRef<THREE.Group>(null)
  const screenGlow = useRef<THREE.PointLight>(null)
  const screenMaterial = useRef<THREE.MeshBasicMaterial>(null)
  const cliTexture = useCliTexture()

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
    if (screenMaterial.current) {
      screenMaterial.current.opacity = THREE.MathUtils.clamp(1 - t * 2.4, 0, 1)
    }
  })

  return (
    <group dispose={null}>
      <group ref={hinge} rotation-x={HINGE_OPEN} position={[0, -0.14, 13.22]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
          <mesh geometry={nodes['Cube008_2'].geometry} position={[0, 0, 0.02]}>
            <meshBasicMaterial
              ref={screenMaterial}
              map={cliTexture}
              toneMapped={false}
              transparent
            />
          </mesh>
        </group>
      </group>
      {/* Warm spill from the terminal onto the keyboard */}
      {/* <pointLight
        ref={screenGlow}
        position={[0, 2.6, 13.8]}
        color="#059669"
        intensity={1.4}
        distance={9}
        decay={2}
      /> */}
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, -0.15, 16.36]} />
      <group position={[0, -0.28, 16.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
