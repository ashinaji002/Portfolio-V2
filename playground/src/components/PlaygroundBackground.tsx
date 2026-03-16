import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type Pointer = { x: number; y: number }

function ParticleField({ pointer }: { pointer: Pointer }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 900

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 30
      data[i * 3 + 1] = (Math.random() - 0.5) * 18
      data[i * 3 + 2] = (Math.random() - 0.5) * 24
    }
    return data
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.035
    pointsRef.current.rotation.x = pointer.y * 0.08
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      pointer.x * 1.6,
      0.04,
    )
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#48d7ff" transparent opacity={0.75} />
    </points>
  )
}

export function PlaygroundBackground({ pointer }: { pointer: Pointer }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.25), transparent 36%), linear-gradient(rgba(51,65,85,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.24) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 46px 46px, 46px 46px',
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
          <ambientLight intensity={0.45} />
          <ParticleField pointer={pointer} />
        </Canvas>
      </div>
    </>
  )
}
