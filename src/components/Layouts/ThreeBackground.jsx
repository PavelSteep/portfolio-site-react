import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // =========================
    // SCENE
    // =========================
    const scene = new THREE.Scene();

    // =========================
    // CAMERA
    // =========================
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // =========================
    // RENDERER
    // =========================
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    // =========================
    // LIGHTS (soft Apple style)
    // =========================
    const light = new THREE.PointLight(0xf7b927, 1.5);
    light.position.set(3, 3, 3);
    scene.add(light);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // =========================
    // OBJECTS
    // =========================
    const objects = [];

    const geometry = new THREE.SphereGeometry(0.25, 16, 16);

    const material = new THREE.MeshStandardMaterial({
      color: 0xf7b927,
      emissive: 0xf7b927,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.4,
    });

    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );

      mesh.userData = {
        speed: 0.005 + Math.random() * 0.01,
        baseY: mesh.position.y,
      };

      scene.add(mesh);
      objects.push(mesh);
    }

    // =========================
    // MOUSE CONTROL
    // =========================
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // =========================
    // SCROLL
    // =========================
    let scrollY = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);

    // =========================
    // ANIMATION LOOP
    // =========================
    const animate = () => {
      requestAnimationFrame(animate);

      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.05;

      camera.position.z = 6 + scrollY * 0.001;

      camera.lookAt(scene.position);

      const time = Date.now() * 0.001;

      objects.forEach((obj) => {
        obj.rotation.y += obj.userData.speed;

        obj.position.y =
          obj.userData.baseY +
          Math.sin(time) * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    // =========================
    // RESIZE
    // =========================
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // =========================
    // CLEANUP
    // =========================
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}