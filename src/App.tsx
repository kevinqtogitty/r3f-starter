import React, { useRef } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useControls, folder } from 'leva';

function App() {
  const BasicSphere = () => {
    const basicSphereRef = useRef<Mesh>(null!);

    // GUI
    const { scale, color, wireframe } = useControls('Box', {
      transform: folder({
        scale: 1
      }),
      material: folder({
        color: '#ff0000',
        wireframe: false
      })
    });

    useFrame((root, delta) => {
      basicSphereRef.current.rotation.x += Math.cos(delta * 0.05) * 0.01;
      basicSphereRef.current.rotation.y += Math.cos(delta * 0.05) * 0.01;
    });

    return (
      <mesh ref={basicSphereRef} scale={scale}>
        <sphereBufferGeometry args={[1, 512, 512]} />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
    );
  };

  const ThreeScene = () => {
    return (
      <Canvas>
        {/**
         * Cameras
         */}

        {/**
         * Lights
         */}
        <ambientLight />
        <directionalLight position={[3, 3, 1]} color="#f3e99b" intensity={2} />

        {/**
         * Controls
         */}

        <OrbitControls />
        {/**
         * Helpers
         */}

        {/**
         * Environment
         */}
        <Stars />

        {/**
         * Objects
         */}
        <BasicSphere />
      </Canvas>
    );
  };

  return (
    <div className="canvasFulLScreened">
      <ThreeScene />
    </div>
  );
}

export default App;
