import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Sky,
  ContactShadows,
} from '@react-three/drei';
import './FarmTwin3D.css';

function CropPlant({ position, size = 1 }) {
  return (
    <group position={position} scale={size}>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.85, 8]} />
        <meshStandardMaterial color="#47752d" />
      </mesh>

      {[
        [-0.19, 0.35, 0.02],
        [0.19, 0.48, 0.02],
        [-0.15, 0.62, 0.01],
        [0.16, 0.7, 0.01],
      ].map((leaf, index) => (
        <mesh
          key={index}
          position={leaf}
          rotation={[0, 0, index % 2 ? -0.45 : 0.45]}
        >
          <sphereGeometry args={[0.19, 8, 6]} />
          <meshStandardMaterial
            color={index % 2 ? '#4f8b37' : '#6ca747'}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function CropRow({ z, rowIndex }) {
  return (
    <group>
      {Array.from({ length: 12 }, (_, index) => (
        <CropPlant
          key={index}
          position={[-5.3 + index * 0.96, 0.12, z]}
          size={0.75 + ((index + rowIndex) % 3) * 0.08}
        />
      ))}
    </group>
  );
}

function FarmScene() {
  const affectedAreas = [
    {
      position: [-2.5, 0.15, -3.25],
      color: '#ef4444',
    },
    {
      position: [2.8, 0.15, 0],
      color: '#f97316',
    },
    {
      position: [0.5, 0.15, 3.1],
      color: '#facc15',
    },
  ];

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[80, 45, 30]}
        inclination={0.5}
        azimuth={0.25}
      />

      <ambientLight intensity={1.1} />

      <directionalLight
        position={[8, 14, 7]}
        intensity={2}
        castShadow
      />

      {/* Main soil plot */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.08, 0]}
        receiveShadow
      >
        <planeGeometry args={[15, 13]} />
        <meshStandardMaterial
          color="#795438"
          roughness={1}
        />
      </mesh>

      {/* Crop beds */}
      {Array.from({ length: 7 }, (_, index) => (
        <mesh
          key={index}
          position={[0, 0.02, -4.8 + index * 1.55]}
        >
          <boxGeometry args={[12.8, 0.12, 0.95]} />
          <meshStandardMaterial
            color={index % 2 ? '#79502f' : '#8b603b'}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Crop rows */}
      {Array.from({ length: 7 }, (_, index) => (
        <CropRow
          key={index}
          z={-4.8 + index * 1.55}
          rowIndex={index}
        />
      ))}

      {/* Affected areas */}
      {affectedAreas.map((area, index) => (
        <group key={index} position={area.position}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.08, 0]}
          >
            <planeGeometry args={[1.8, 0.8]} />
            <meshBasicMaterial
              color={area.color}
              transparent
              opacity={0.85}
              depthWrite={false}
              side={2}
            />
          </mesh>
        </group>
      ))}

      {/* Grass surrounding the plot */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.18, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#72965a" />
      </mesh>

      {/* Water channel */}
      <mesh position={[0, 0.015, 5.9]}>
        <boxGeometry args={[13, 0.025, 0.32]} />
        <meshStandardMaterial
          color="#4ba6c5"
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      <ContactShadows
        position={[0, -0.16, 0]}
        opacity={0.25}
        scale={22}
        blur={2}
      />

      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        minDistance={7}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

export default function FarmTwin3D() {
  const alerts = [
    {
      label: 'Crop Stress',
      detail: 'Sample alert',
      color: '#ef4444',
    },
    {
      label: 'Low Moisture',
      detail: 'Sample alert',
      color: '#f97316',
    },
    {
      label: 'Nutrient Deficiency',
      detail: 'Sample alert',
      color: '#facc15',
    },
  ];

  return (
    <section className="farm-twin-panel">
      <div className="farm-twin-heading">
        <div>
          <p className="farm-twin-eyebrow">
            DIGITAL FARM MODEL
          </p>

          <h2>🌱 Interactive 3D Farm</h2>

          <p>
            Explore the crop field, soil beds and irrigation channel.
          </p>
        </div>

        <span className="farm-live-badge">
          ● 3D MODEL
        </span>
      </div>

      <div className="farm-canvas">
        <Canvas
          shadows
          camera={{
            position: [13, 11, 15],
            fov: 45,
          }}
        >
          <FarmScene />
        </Canvas>

        {/* Stable HTML labels outside the Three.js scene */}
        <div className="farm-alert-overlay">
          {alerts.map((alert) => (
            <div
              key={alert.label}
              className="farm-alert-label"
              style={{
                backgroundColor: alert.color,
                color:
                  alert.color === '#facc15'
                    ? '#222'
                    : '#fff',
              }}
            >
              <strong>{alert.label}</strong>
              <span>{alert.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="farm-twin-help">
        <span>🖱️ Drag to rotate</span>
        <span>🔍 Scroll to zoom</span>
        <span>↔️ Right-drag to pan</span>
      </div>

      <p className="farm-twin-note">
        This is a 3D visual model, not a live reconstruction of your
        actual farm. Crop and soil indicators can be connected to
        measured farm data in a later step.
      </p>
    </section>
  );
}
