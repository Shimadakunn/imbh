import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('./puffer.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Bras_gauche.geometry} material={materials.Matériau} position={[-1.5, 0, 1.28]} scale={[1.01, 1, 1]} />
      <mesh geometry={nodes.Bras_gauche001.geometry} material={materials.Matériau} position={[1.68, 0.08, 0]} rotation={[-Math.PI, 0.01, -Math.PI]} scale={[1.01, 1, 1]} />
      <mesh geometry={nodes.Body.geometry} material={materials.Matériau} position={[0, 0.02, 0.64]} />
      <mesh geometry={nodes.Mesh_0016.geometry} material={materials.Matériau} position={[0.11, 3.08, 1.58]} rotation={[-0.76, -0.01, 0.02]} scale={[1.3, 1.2, 1.3]} />
      <mesh geometry={nodes.Mesh_0017.geometry} material={materials.Matériau} position={[0.08, -2.57, 1.29]} rotation={[0, 0.04, 0]} scale={[1.3, 1.75, 1.3]} />
      <mesh geometry={nodes.Mesh_0043.geometry} material={materials.Matériau} position={[0, 3.7, 0.25]} rotation={[1.08, 0, 0]} scale={[1.2, 1.4, 1.2]} />
      <mesh geometry={nodes.Mesh_0018.geometry} material={materials.Matériau} position={[0, 3.75, 0.24]} rotation={[-2.29, 0.01, -3.14]} scale={[1.2, 1.54, 1.2]} />
      <mesh geometry={nodes.Style_bras1.geometry} material={materials.Matériau} position={[0, 0, 0.18]} />
      <mesh geometry={nodes.Style_bras2.geometry} material={materials.Matériau} position={[0, 0, 0.08]} />
      <mesh geometry={nodes.Style_bras3.geometry} material={materials.Matériau} position={[0, 0, -0.03]} />
      <mesh geometry={nodes.Style_bras3001.geometry} material={materials.Matériau} position={[0.12, 0.04, 1.35]} rotation={[-Math.PI, 0.01, -Math.PI]} />
      <mesh geometry={nodes.Style_bras3003.geometry} material={materials.Matériau} position={[0.13, 0.06, 0.03]} rotation={[-Math.PI, 0.01, -Math.PI]} />
      <mesh geometry={nodes.Style_bras3002.geometry} material={materials.Matériau} position={[0, 0, 1.35]} />
      <mesh geometry={nodes.Style_bras2001.geometry} material={materials.Matériau} position={[0.13, 0.07, 1.3]} rotation={[-Math.PI, 0.01, -Math.PI]} />
      <mesh geometry={nodes.Style_bras1002.geometry} material={materials.Matériau} position={[0.17, 0.07, 1.17]} rotation={[-Math.PI, 0.01, -Math.PI]} />
      <mesh geometry={nodes.Style_bras2003.geometry} material={materials.Matériau} position={[0.13, 0.07, 0.08]} rotation={[-Math.PI, 0.01, -Math.PI]} />
      <mesh geometry={nodes.Style_bras1003.geometry} material={materials.Matériau} position={[0.17, 0.07, 0.18]} rotation={[-Math.PI, 0.01, -Math.PI]} />
      <mesh geometry={nodes.Style_bras2002.geometry} material={materials.Matériau} position={[0, 0, 1.3]} />
      <mesh geometry={nodes.Style_bras1001.geometry} material={materials.Matériau} position={[0, 0, 1.17]} />
      <mesh geometry={nodes.Mesh_0010.geometry} material={materials.Matériau} position={[0, 0.24, -0.13]} rotation={[-0.58, 0, 0]} />
      <mesh geometry={nodes.Mesh_0005.geometry} material={materials.Matériau} position={[0.05, 0.25, -0.2]} rotation={[-0.49, 0, 0]} />
      <mesh geometry={nodes.Mesh_0006.geometry} material={materials.Matériau} position={[0.36, 0.8, 1.18]} rotation={[-1.57, -0.05, 0.05]} scale={1.2} />
      <mesh geometry={nodes.Mesh_0009.geometry} material={materials.Matériau} position={[0.02, 0.12, -0.75]} rotation={[-0.2, 0, 0]} />
      <mesh geometry={nodes.Mesh_0001.geometry} material={materials.Matériau} position={[0.06, 0.69, 0.18]} rotation={[2.5, -0.01, 3.14]} />
      <mesh geometry={nodes.Mesh_0002.geometry} material={materials.Matériau} position={[0.01, 0.74, 0.36]} rotation={[1.96, -0.02, -3.1]} />
      <mesh geometry={nodes.Mesh_0015.geometry} material={materials.Matériau} position={[0.08, 0.72, 1.66]} rotation={[0.39, 0, -0.02]} scale={[1.15, 1.1, 1.5]} />
      <mesh geometry={nodes.Mesh_0011.geometry} material={materials.Matériau} position={[0.06, 0.14, 1.07]} rotation={[0.58, -0.03, -0.09]} scale={1.1} />
      <mesh geometry={nodes.Mesh_0012.geometry} material={materials.Matériau} position={[0.22, 0.37, 1.22]} rotation={[0.58, 0, 0]} scale={1.1} />
      <mesh geometry={nodes.Mesh_0013.geometry} material={materials.Matériau} position={[-0.01, 0.26, 0.98]} rotation={[0.84, -0.04, -0.08]} scale={1.1} />
      <mesh geometry={nodes.Mesh_0014.geometry} material={materials.Matériau} position={[0, 0.5, 1.64]} rotation={[0.39, 0, 0]} />
      <mesh geometry={nodes.Mesh_0003.geometry} material={materials.Matériau} position={[0, 0.59, 1.76]} rotation={[-2.79, -0.01, -3.14]} />
      <mesh geometry={nodes.Mesh_0004.geometry} material={materials.Matériau} position={[-0.07, 0.36, 1]} rotation={[-2.27, -0.01, -3.14]} scale={1.1} />
      <mesh geometry={nodes.Mesh_0007.geometry} material={materials.Matériau} position={[-0.09, 0.27, 1]} rotation={[-2.43, 0.01, 3.14]} scale={1.1} />
      <mesh geometry={nodes.Mesh_0008.geometry} material={materials.Matériau} position={[-0.08, 0.21, 0.91]} rotation={[-2.46, -0.01, -3.14]} scale={1.1} />
    </group>
  )
}

useGLTF.preload('/b_puffer-transformed.glb')
