"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DESTINATIONS } from "@/lib/mock-data";
import { Destination } from "@/types";

interface InteractiveGlobeProps {
  onSelectDestination: (dest: Destination) => void;
  selectedDestination: Destination | null;
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  onSelectDestination,
  selectedDestination,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  const activeDestRef = useRef<Destination | null>(selectedDestination);
  useEffect(() => {
    activeDestRef.current = selectedDestination;
  }, [selectedDestination]);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 800;
    const height = currentMount.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    currentMount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 75;

    // 1. High-Precision Luxury Dark Earth Texture with authentic world continent contours
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Deep ocean teal base matching brand logo canvas
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      bgGrad.addColorStop(0, "#011f26");
      bgGrad.addColorStop(0.5, "#002d37");
      bgGrad.addColorStop(1, "#004d5d");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 2048, 1024);

      // Fine coordinate grid lines (Brand Logo Latitude & Longitude lines)
      ctx.strokeStyle = "rgba(181, 234, 244, 0.12)";
      ctx.lineWidth = 1;
      for (let y = 0; y <= 1024; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(2048, y);
        ctx.stroke();
      }
      for (let x = 0; x <= 2048; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }

      // Major latitude markers (Equator & Tropics)
      ctx.strokeStyle = "rgba(255, 105, 107, 0.25)";
      ctx.lineWidth = 1.5;
      [384, 512, 640].forEach((latY) => {
        ctx.beginPath();
        ctx.moveTo(0, latY);
        ctx.lineTo(2048, latY);
        ctx.stroke();
      });

      // Stylized continents in Oceanic Slate with soft Coral-tinted coastal hairline
      ctx.fillStyle = "rgba(0, 77, 93, 0.55)";
      ctx.strokeStyle = "rgba(181, 234, 244, 0.4)";
      ctx.lineWidth = 1.2;

      const drawPolygon = (pts: [number, number][]) => {
        if (pts.length < 3) return;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      // Accurate Indian Subcontinent & Konkan Coast
      drawPolygon([
        [1410, 360], // Kashmir
        [1460, 420], // Nepal / Ganges Plain
        [1510, 480], // Bengal / Sundarbans
        [1480, 560], // Coromandel Coast
        [1450, 620], // Kanyakumari Tip
        [1420, 560], // Malabar / Kerala
        [1405, 530], // Goa & Konkan Coast
        [1380, 490], // Gujarat / Gulf of Kutch
        [1350, 440], // Indus / Pakistan
        [1380, 390], // Punjab
      ]);

      // Sri Lanka
      drawPolygon([
        [1465, 630],
        [1480, 650],
        [1465, 670],
        [1450, 650],
      ]);

      // Arabian Peninsula & Middle East
      drawPolygon([
        [1250, 440],
        [1310, 440],
        [1340, 490],
        [1320, 560],
        [1260, 580],
        [1220, 520],
        [1220, 460],
      ]);

      // Africa
      drawPolygon([
        [1080, 420],
        [1160, 430],
        [1230, 510],
        [1220, 620],
        [1160, 780],
        [1080, 680],
        [1030, 540],
        [1020, 460],
      ]);

      // Europe & Mediterranean
      drawPolygon([
        [1060, 320],
        [1080, 260],
        [1120, 190],
        [1180, 220],
        [1220, 290],
        [1180, 370],
        [1100, 380],
      ]);

      // East & Southeast Asia
      drawPolygon([
        [1510, 360],
        [1620, 360],
        [1680, 400],
        [1620, 470],
        [1560, 520],
        [1540, 590],
        [1580, 640],
      ]);

      // Australasia
      drawPolygon([
        [1680, 680],
        [1780, 700],
        [1790, 800],
        [1710, 830],
        [1640, 760],
      ]);

      // Americas (North)
      drawPolygon([
        [360, 220],
        [500, 260],
        [620, 320],
        [560, 440],
        [480, 460],
        [440, 420],
        [380, 320],
      ]);

      // Americas (South)
      drawPolygon([
        [520, 500],
        [620, 540],
        [660, 620],
        [580, 760],
        [530, 840],
        [490, 700],
        [480, 580],
      ]);

      // Luminous Brand Coral Beacon over Goa coordinates on texture [1405, 530]
      const radGrad = ctx.createRadialGradient(1405, 530, 1, 1405, 530, 18);
      radGrad.addColorStop(0, "rgba(255, 105, 107, 1)");
      radGrad.addColorStop(0.4, "rgba(255, 130, 132, 0.75)");
      radGrad.addColorStop(1, "rgba(255, 105, 107, 0)");
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(1405, 530, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    const earthTexture = new THREE.CanvasTexture(canvas);
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const sphereGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.75,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(earthMesh);

    // Subtle Ocean Teal Atmospheric Glow Outer Shell
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.035, 48, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x22a2bb,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmoMesh);

    // Balanced Directional Lighting (Warm ambient without glare)
    const ambientLight = new THREE.AmbientLight(0xdcf8fd, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(100, 100, 140);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x22a2bb, 0.7);
    fillLight.position.set(-140, -40, -100);
    scene.add(fillLight);

    // Conversion helper: Lat/Lng to Vector3 on sphere surface
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 2. Goa Sanctuaries Waypoints
    const markerGroup = new THREE.Group();
    globeGroup.add(markerGroup);

    const markerMeshes: { mesh: THREE.Mesh; dest: Destination; ring: THREE.Mesh }[] = [];
    const hitObjects: THREE.Mesh[] = [];

    DESTINATIONS.forEach((dest, idx) => {
      // Offset slightly on global projection for distinct pin selection
      const spreadLat = dest.coordinates[0] + (idx % 2 === 0 ? 0.7 : -0.7);
      const spreadLng = dest.coordinates[1] + (idx * 0.9 - 2.2);

      const pos = latLngToVector3(spreadLat, spreadLng, RADIUS + 1.2);

      // Coral Pin Core (Matching Yatra Vista Brand Logo)
      const pinGeo = new THREE.SphereGeometry(1.8, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xff696b,
        emissive: 0xff696b,
        emissiveIntensity: 0.9,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      markerGroup.add(pinMesh);

      // Concentric Coral Sonar Ring
      const ringGeo = new THREE.RingGeometry(2.2, 3.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff8284,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.008));
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      markerGroup.add(ringMesh);

      // Hit Target (larger hitbox for easy clicking)
      const hitGeo = new THREE.SphereGeometry(5.0, 16, 16);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(pos);
      hitMesh.userData = { destination: dest };
      markerGroup.add(hitMesh);
      hitObjects.push(hitMesh);

      markerMeshes.push({ mesh: pinMesh, dest, ring: ringMesh });
    });

    // Global Flight Corridors into Goa (London, Dubai, Singapore, Mumbai, Delhi)
    const internationalHubs = [
      { name: "Dubai", lat: 25.20, lng: 55.27 },
      { name: "London", lat: 51.50, lng: -0.12 },
      { name: "Singapore", lat: 1.35, lng: 103.81 },
      { name: "Mumbai", lat: 19.07, lng: 72.87 },
      { name: "Delhi", lat: 28.61, lng: 77.20 },
    ];
    const goaPos = latLngToVector3(15.29, 73.92, RADIUS + 1.2);

    internationalHubs.forEach((hub) => {
      const hubPos = latLngToVector3(hub.lat, hub.lng, RADIUS + 1.2);
      const mid = hubPos.clone().add(goaPos).multiplyScalar(0.5);
      const dist = hubPos.distanceTo(goaPos);
      mid.normalize().multiplyScalar(RADIUS + Math.min(22, dist * 0.28));

      const curve = new THREE.QuadraticBezierCurve3(hubPos, mid, goaPos);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xff696b,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(line);
    });

    // Intra-Goa Sanctuary Connectors
    for (let i = 0; i < markerMeshes.length - 1; i++) {
      const p1 = markerMeshes[i].mesh.position;
      const p2 = markerMeshes[i + 1].mesh.position;
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(RADIUS + 6);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x60cde3,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(line);
    }

    // Initial orientation: Directly facing Goa & Indian Subcontinent (~74°E)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRotY = -1.28;
    let targetRotX = 0.28;
    globeGroup.rotation.y = -1.28;
    globeGroup.rotation.x = 0.28;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const domElement = renderer.domElement;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotY += dx * 0.005;
        targetRotX += dy * 0.005;
        targetRotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotX));
        prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hitObjects);
        domElement.style.cursor = intersects.length > 0 ? "pointer" : "grab";
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;

      const rect = domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hitObjects);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.destination) {
          onSelectDestination(hit.userData.destination);
        }
      }
    };

    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Animation loop with automatic smooth orient towards selected destination
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // If user is not dragging, gently rotate while keeping Goa front and center
      if (!isDragging) {
        targetRotY += 0.0004;
      }

      globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.05;

      // Pulse rings
      markerMeshes.forEach(({ ring, dest }) => {
        const isSelected = activeDestRef.current?.id === dest.id;
        const pulse = 1 + (Math.sin(elapsed * (isSelected ? 5 : 2.5)) + 1) * 0.4;
        ring.scale.set(pulse, pulse, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0.15, 0.9 - (pulse - 1));
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 800;
      const h = mountRef.current.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectDestination]);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface-card rounded-2xl p-8 border border-white/10 text-center">
        <p className="text-sand-300 text-sm">
          WebGL acceleration disabled. Select destination tabs above to explore Goa.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-[520px] sm:h-[620px] cursor-grab active:cursor-grabbing relative"
    />
  );
};
