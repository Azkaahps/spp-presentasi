import React, { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows, Environment, Lightformer } from '@react-three/drei'

/* =========================================================
   Robot GLB - pixellabs-robot (model dari user)
   File asli 42,55 MB (tekstur PNG 4096px) sudah dioptimasi
   lewat gltf-transform: tekstur 1024px WebP, geometri tetap
   -> 1,34 MB. Model tidak punya animasi bawaan, jadi gerakan
   dibuat procedural: hover naik-turun halus. Rotasi dikunci
   madep depan (BASE_YAW) supaya selalu menghadap kamera.

   Bounding box hasil ukur (world space):
     tinggi : 0.9965 unit, kaki di y = 0
     center : x 0.0085, z 0.0179
   Nilai ini dipakai untuk memusatkan model di titik asal
   supaya transform-nya tidak bergeser saat runtime.
   ========================================================= */

const AMBER = '#E8B44A'
const MODEL_HEIGHT = 0.99648
const MODEL_CENTER_X = 0.00851
const MODEL_CENTER_Z = 0.01793

/* Sudut hasil uji 4 rotasi: 90 derajat = robot menghadap
   langsung ke kamera (madep depan). Nilai tetap, tidak pernah
   diubah animasi apa pun. */
const BASE_YAW = Math.PI / 2

function Robot({ targetHeight = 2.3 }) {
  const group = useRef()
  const { scene } = useGLTF('/models/pixellabs-robot.glb')

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const k = Math.min(1, delta * 2)

    /* hover: melayang naik-turun halus di atas shadow.
       Rotasi tidak disentuh sama sekali -> selalu madep depan. */
    const targetY = 0.05 + Math.sin(t * 0.9) * 0.045
    group.current.position.y += (targetY - group.current.position.y) * k
  })

  const s = targetHeight / MODEL_HEIGHT

  return (
    <group ref={group} rotation={[0, BASE_YAW, 0]}>
      <group
        scale={s}
        position={[-MODEL_CENTER_X * s, (-MODEL_HEIGHT * s) / 2, -MODEL_CENTER_Z * s]}
      >
        <primitive object={scene} />
      </group>
    </group>
  )
}

/* Cahaya hangat di lantai: bikin shadow di bawah robot terbaca
   di background gelap. Bukan card/border, cuma gradasi halus. */
function GroundGlow({ y, radius = 1.5 }) {
  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, 'rgba(232, 180, 74, 0.38)')
    g.addColorStop(0.42, 'rgba(232, 180, 74, 0.14)')
    g.addColorStop(1, 'rgba(232, 180, 74, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <circleGeometry args={[radius, 48]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  )
}

export function RobotScene({ targetHeight = 2.3, dpr = [1, 1.75] }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  const groundY = -targetHeight / 2

  return (
    <div className="scene3d" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.4, 5.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, camera }) => {
          gl.setClearAlpha(0)
          camera.lookAt(0, 0, 0)
        }}
        onError={() => setFailed(true)}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} color="#fff3dd" />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color={AMBER} />

        <GroundGlow y={groundY + 0.01} />

        <Suspense fallback={null}>
          <Robot targetHeight={targetHeight} />
        </Suspense>

        <ContactShadows
          position={[0, groundY, 0]}
          opacity={0.55}
          scale={6}
          blur={2.8}
          far={1.2}
          resolution={512}
          color="#000000"
        />

        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[7, 7, 1]} color="#fff2dc" />
          <Lightformer intensity={1.3} position={[-4, 2, -2]} scale={[5, 5, 1]} color={AMBER} />
          <Lightformer intensity={0.9} position={[4, 1.5, 2]} scale={[4, 4, 1]} color="#ffffff" />
        </Environment>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/pixellabs-robot.glb')
