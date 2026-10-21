
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const alerts = [
  {
    position: [-2.5, 2.15, -3.25],
    label: 'Crop Stress',
    detail: 'Sample alert',
    color: '#ef4444',
  },
  {
    position: [2.8, 1.05, 0],
    label: 'Low Moisture',
    detail: 'Sample alert',
    color: '#f97316',
  },
  {
    position: [0.5, 1.05, 3.1],
    label: 'Nutrient Deficiency',
    detail: 'Sample alert',
    color: '#facc15',
  },
];

export default function FarmAlertLabels({ containerRef }) {
  const { camera, gl, size } = useThree();
  const labelRefs = useRef([]);

  useEffect(() => {
    const updateLabels = () => {
      const container = containerRef.current;
      if (!container) return;

      const canvasRect = gl.domElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      alerts.forEach((alert, index) => {
        const element = labelRefs.current[index];
        if (!element) return;

        const point = new THREE.Vector3(...alert.position);
        point.project(camera);

        const x = canvasRect.left + (point.x + 1) * canvasRect.width / 2;
        const y = canvasRect.top + (1 - point.y) * canvasRect.height / 2;

        const visible =
          point.z > -1 &&
          point.z < 1 &&
          point.x >= -1 &&
          point.x <= 1 &&
          point.y >= -1 &&
          point.y <= 1;

        element.style.display = visible ? 'flex' : 'none';
        element.style.left = `${x - containerRect.left}px`;
        element.style.top = `${y - containerRect.top}px`;
      });
    };

    const frame = () => {
      updateLabels();
      return requestAnimationFrame(frame);
    };

    const animationId = frame();

    return () => cancelAnimationFrame(animationId);
  }, [camera, gl, size, containerRef]);

  return (
    <div className="farm-alert-overlay">
      {alerts.map((alert, index) => (
        <div
          key={alert.label}
          ref={(element) => {
            labelRefs.current[index] = element;
          }}
          className="farm-alert-label"
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            backgroundColor: alert.color,
            color: alert.color === '#facc15' ? '#222' : '#fff',
          }}
        >
          <strong>{alert.label}</strong>
          <span>{alert.detail}</span>
        </div>
      ))}
    </div>
  );
}
