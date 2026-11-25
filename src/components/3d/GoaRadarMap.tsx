"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DESTINATIONS } from "@/lib/mock-data";
import { Destination } from "@/types";

interface GoaRadarMapProps {
  onSelectDestination: (dest: Destination) => void;
  selectedDestination: Destination | null;
}

// Geographic mapping for the 6 sanctuaries in Goa (accurately scaled to 3D cartographic basin)
// North: negative Z, South: positive Z. West (Ocean): negative X, East (Ghats): positive X.
const SANCTUARY_COORDINATES: Record<string, { x: number; y: number; z: number; label: string; region: string }> = {
  "ashvem-morjim": { x: -26, y: 3.5, z: -62, label: "Ashvem & Morjim", region: "North Goa Dunes" },
  "assagao-vagator": { x: -18, y: 5.2, z: -40, label: "Assagao & Vagator", region: "Riviera & Clifftops" },
  "fontainhas-panaji": { x: -10, y: 4.0, z: -16, label: "Fontainhas Latin Quarter", region: "Heritage Capital" },
  "divar-chorao-islands": { x: 4, y: 3.8, z: -10, label: "Divar Island Backwaters", region: "Riverine Sanctuary" },
  "ponda-western-ghats": { x: 26, y: 15.0, z: 16, label: "Ponda & Dudhsagar", region: "Sahyadri Rainforest" },
  "cabo-de-rama": { x: -20, y: 6.8, z: 58, label: "Cabo de Rama & South", region: "Southern Clifftops" },
};

export const GoaRadarMap: React.FC<GoaRadarMapProps> = ({
  onSelectDestination,
  selectedDestination,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);

  // Store active destination reference for animation frame access
  const activeDestRef = useRef<Destination | null>(selectedDestination);
  useEffect(() => {
    activeDestRef.current = selectedDestination;
  }, [selectedDestination]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 800;
    const height = currentMount.clientHeight || 560;

    const scene = new THREE.Scene();
    // Atmospheric fog in brand abyss teal
    scene.fog = new THREE.FogExp2(0x011f26, 0.0028);

    const camera = new THREE.PerspectiveCamera(38, width / height, 1, 1000);
    camera.position.set(0, 140, 165);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    currentMount.appendChild(renderer.domElement);

    const mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // ==========================================
    // 1. LIGHTING (Teal & Warm Coral Harmony)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0e4754, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffb2b4, 2.2);
    keyLight.position.set(80, 160, 90);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22a2bb, 1.8);
    rimLight.position.set(-110, 80, -70);
    scene.add(rimLight);

    // =========================================================
    // 2. LUXURY CIRCULAR RADAR PEDESTAL (No chopped edges!)
    // ==========================================
    const BASIN_RADIUS = 98;
    const basinGeo = new THREE.CylinderGeometry(BASIN_RADIUS, BASIN_RADIUS + 4, 8, 80);
    basinGeo.translate(0, -4.5, 0);

    // Procedural radar disk texture with coordinate lines and degree azimuth ticks
    const radarCanvas = document.createElement("canvas");
    radarCanvas.width = 2048;
    radarCanvas.height = 2048;
    const rCtx = radarCanvas.getContext("2d");

    if (rCtx) {
      const cx = 1024;
      const cy = 1024;

      // Dark oceanic gradient fill
      const grad = rCtx.createRadialGradient(cx, cy, 50, cx, cy, 1020);
      grad.addColorStop(0, "#002832");
      grad.addColorStop(0.5, "#002029");
      grad.addColorStop(0.85, "#001820");
      grad.addColorStop(1, "#001017");
      rCtx.fillStyle = grad;
      rCtx.fillRect(0, 0, 2048, 2048);

      // Fine coordinate grid lines (Latitude & Longitude matching logo)
      rCtx.strokeStyle = "rgba(181, 234, 244, 0.08)";
      rCtx.lineWidth = 1.5;
      for (let p = 128; p < 2048; p += 96) {
        rCtx.beginPath();
        rCtx.moveTo(0, p);
        rCtx.lineTo(2048, p);
        rCtx.stroke();

        rCtx.beginPath();
        rCtx.moveTo(p, 0);
        rCtx.lineTo(p, 2048);
        rCtx.stroke();
      }

      // Concentric Radar Rings
      [220, 440, 660, 860, 980].forEach((r, idx) => {
        rCtx.beginPath();
        rCtx.arc(cx, cy, r, 0, Math.PI * 2);
        rCtx.strokeStyle = idx === 4 ? "rgba(255, 105, 107, 0.45)" : "rgba(34, 162, 187, 0.22)";
        rCtx.lineWidth = idx === 4 ? 3 : 1.5;
        rCtx.stroke();
      });

      // Azimuth 360-degree radial ticks & Cardinal Directions
      for (let deg = 0; deg < 360; deg += 5) {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 30 === 0;
        const isCardinal = deg % 90 === 0;
        const tickLen = isCardinal ? 32 : isMajor ? 20 : 10;
        const outerR = 970;
        const innerR = outerR - tickLen;

        const x1 = cx + Math.cos(rad) * outerR;
        const y1 = cy + Math.sin(rad) * outerR;
        const x2 = cx + Math.cos(rad) * innerR;
        const y2 = cy + Math.sin(rad) * innerR;

        rCtx.beginPath();
        rCtx.moveTo(x1, y1);
        rCtx.lineTo(x2, y2);
        rCtx.strokeStyle = isCardinal ? "#ff696b" : isMajor ? "rgba(181, 234, 244, 0.6)" : "rgba(181, 234, 244, 0.2)";
        rCtx.lineWidth = isCardinal ? 3 : isMajor ? 2 : 1;
        rCtx.stroke();
      }

      // Compass Cardinal Labels (N, E, S, W)
      rCtx.font = "bold 28px sans-serif";
      rCtx.fillStyle = "#ff696b";
      rCtx.textAlign = "center";
      rCtx.textBaseline = "middle";
      rCtx.fillText("N • 15.68°", cx, cy - 910);
      rCtx.fillText("S • 15.00°", cx, cy + 910);
      rCtx.fillText("E • 74.25°", cx + 910, cy);
      rCtx.fillText("W • 73.65°", cx - 910, cy);

      // Center Datum Badge
      rCtx.font = "bold 20px monospace";
      rCtx.fillStyle = "rgba(255, 105, 107, 0.75)";
      rCtx.fillText("DATUM: GOA COASTAL FRONTIER", cx, cy - 250);
    }

    const radarTexture = new THREE.CanvasTexture(radarCanvas);
    radarTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const basinMat = new THREE.MeshStandardMaterial({
      map: radarTexture,
      roughness: 0.45,
      metalness: 0.35,
    });
    const basinMesh = new THREE.Mesh(basinGeo, basinMat);
    mapGroup.add(basinMesh);

    // Outer Glowing Pedestal Rim
    const rimRingGeo = new THREE.RingGeometry(BASIN_RADIUS - 0.5, BASIN_RADIUS + 2.5, 80);
    rimRingGeo.rotateX(-Math.PI / 2);
    const rimRingMat = new THREE.MeshBasicMaterial({
      color: 0x004d5d,
      side: THREE.DoubleSide,
    });
    const rimRing = new THREE.Mesh(rimRingGeo, rimRingMat);
    rimRing.position.y = 0.05;
    mapGroup.add(rimRing);

    // =========================================================
    // 3. AUTHENTIC GOA TOPOGRAPHY (Sculpted & Circularly Blended)
    // =========================================================
    const terrainWidth = 140;
    const terrainDepth = 175;
    const terrainResX = 90;
    const terrainResZ = 110;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, terrainResX, terrainResZ);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);

      // Distance from center for smooth circular blending into pedestal
      const distFromCenter = Math.sqrt(vx * vx + vz * vz);
      const maxR = BASIN_RADIUS - 8;

      let vy = 0;

      // Goa Coastline Boundary modeling (West is negative X, East is positive X)
      // Realistic coastal contour equation:
      const coastX = -24 + Math.sin(vz * 0.04) * 5 + Math.cos(vz * 0.08) * 3;

      if (vx < coastX) {
        // Arabian Sea
        vy = -0.6;
      } else {
        // Coastal lowlands into Sahyadri Range
        const inlandDist = vx - coastX;
        const normInland = Math.min(inlandDist / 55, 1.0);

        // Gentle coastal elevation transitioning into eastern mountain peaks
        vy = 1.5 + Math.pow(normInland, 1.5) * 18.0;

        // Mountain ridge undulations
        vy += Math.sin(vx * 0.18 + vz * 0.06) * 3.2;
        vy += Math.cos(vx * 0.12 - vz * 0.14) * 2.4;

        // Mandovi River Estuary cut (near Z: -15)
        const mandoviDist = Math.abs(vz - (-16 + Math.sin(vx * 0.07) * 6));
        if (mandoviDist < 5.0 && vx < 18) {
          vy = Math.max(-0.4, vy - (5.2 - mandoviDist) * 1.8);
        }

        // Zuari River Estuary cut (near Z: 10)
        const zuariDist = Math.abs(vz - (12 + Math.cos(vx * 0.05) * 6));
        if (zuariDist < 5.5 && vx < 20) {
          vy = Math.max(-0.4, vy - (5.8 - zuariDist) * 1.8);
        }
      }

      // Smooth circular falloff at pedestal boundary
      if (distFromCenter > maxR - 15) {
        const falloff = Math.max(0, (maxR - distFromCenter) / 15);
        vy *= falloff;
      }
      if (distFromCenter >= maxR) {
        vy = 0;
      }

      posAttr.setY(i, vy);
    }
    terrainGeo.computeVertexNormals();

    // Elegant Topographic Material (Deep Teal with soft rim response)
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x00313c,
      roughness: 0.55,
      metalness: 0.3,
      flatShading: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.y = 0.1;
    mapGroup.add(terrainMesh);

    // Glowing Topographic Elevation Contour Lines
    const topoWireMat = new THREE.MeshBasicMaterial({
      color: 0x005c6e,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const topoWire = new THREE.Mesh(terrainGeo, topoWireMat);
    topoWire.position.y = 0.15;
    mapGroup.add(topoWire);

    // =========================================================
    // 4. ARABIAN SEA SURFACE WITH SHIMMER
    // =========================================================
    const seaGeo = new THREE.CircleGeometry(BASIN_RADIUS - 4, 64);
    seaGeo.rotateX(-Math.PI / 2);
    const seaMat = new THREE.MeshStandardMaterial({
      color: 0x001f28,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75,
    });
    const seaMesh = new THREE.Mesh(seaGeo, seaMat);
    seaMesh.position.y = -0.3;
    mapGroup.add(seaMesh);

    // =========================================================
    // 5. LUMINOUS COASTLINE RIBBON (Tiracol to Palolem)
    // =========================================================
    const coastPoints: THREE.Vector3[] = [
      new THREE.Vector3(-25, 2.0, -80), // Querim / Tiracol Fort
      new THREE.Vector3(-26, 2.2, -68), // Arambol Sweet Lake
      new THREE.Vector3(-26, 2.8, -58), // Ashvem Beach
      new THREE.Vector3(-23, 3.2, -45), // Morjim & Chapora Fort Cliff
      new THREE.Vector3(-20, 3.5, -34), // Vagator & Anjuna
      new THREE.Vector3(-18, 3.0, -24), // Baga & Calangute
      new THREE.Vector3(-16, 2.6, -16), // Aguada Bastion / Mandovi Mouth
      new THREE.Vector3(-14, 2.4, -6),  // Miramar & Panaji
      new THREE.Vector3(-15, 2.8, 6),   // Mormugao Peninsula
      new THREE.Vector3(-18, 2.5, 20),  // Bogmalo / Arossim
      new THREE.Vector3(-19, 2.7, 36),  // Majorda & Colva
      new THREE.Vector3(-20, 3.0, 48),  // Benaulim & Cavelossim
      new THREE.Vector3(-21, 6.2, 58),  // Cabo de Rama Red Laterite Cliffs
      new THREE.Vector3(-20, 4.5, 70),  // Cola Beach Emerald Lagoon
      new THREE.Vector3(-18, 3.2, 80),  // Palolem Crescent Bay
      new THREE.Vector3(-16, 2.0, 90),  // Galgibaga Turtle Sanctuary
    ];
    const coastCurve = new THREE.CatmullRomCurve3(coastPoints);
    const coastGeo = new THREE.BufferGeometry().setFromPoints(coastCurve.getPoints(90));
    const coastMat = new THREE.LineBasicMaterial({
      color: 0x22a2bb,
      transparent: true,
      opacity: 0.9,
    });
    const coastLine = new THREE.Line(coastGeo, coastMat);
    mapGroup.add(coastLine);

    // =========================================================
    // 6. SANCTUARY WAYPOINT BEACONS (Sunset Coral #ff696b)
    // =========================================================
    const beaconMeshes: {
      dest: Destination;
      core: THREE.Mesh;
      beam: THREE.Mesh;
      ring1: THREE.Mesh;
      ring2: THREE.Mesh;
      coords: { x: number; y: number; z: number };
    }[] = [];

    const hitTargets: THREE.Mesh[] = [];

    DESTINATIONS.forEach((dest) => {
      const coords = SANCTUARY_COORDINATES[dest.id] || {
        x: 0,
        y: 6,
        z: 0,
        label: dest.name,
        region: "Goa Sanctuary",
      };

      const beaconGroup = new THREE.Group();
      beaconGroup.position.set(coords.x, coords.y, coords.z);
      mapGroup.add(beaconGroup);

      // Core Gem (Coral Sphere)
      const coreGeo = new THREE.SphereGeometry(1.6, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xff696b,
        emissive: 0xff696b,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = 1.0;
      beaconGroup.add(coreMesh);

      // Elegant Vertical Light Filament (Tapered upward, feathered)
      const beamGeo = new THREE.CylinderGeometry(0.12, 0.45, 14, 16);
      beamGeo.translate(0, 7, 0);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xff8284,
        transparent: true,
        opacity: 0.65,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beaconGroup.add(beamMesh);

      // Radar Ripple Ring 1
      const ring1Geo = new THREE.RingGeometry(1.6, 2.5, 32);
      ring1Geo.rotateX(-Math.PI / 2);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xff696b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.position.y = 0.2;
      beaconGroup.add(ring1);

      // Radar Ripple Ring 2 (Offset phase)
      const ring2Geo = new THREE.RingGeometry(2.8, 3.8, 32);
      ring2Geo.rotateX(-Math.PI / 2);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xff8284,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.position.y = 0.2;
      beaconGroup.add(ring2);

      // Generous Hit Target (Radius 9 for easy clicking/hovering)
      const hitGeo = new THREE.SphereGeometry(8, 16, 16);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(coords.x, coords.y + 2, coords.z);
      hitMesh.userData = { destination: dest };
      mapGroup.add(hitMesh);
      hitTargets.push(hitMesh);

      beaconMeshes.push({
        dest,
        core: coreMesh,
        beam: beamMesh,
        ring1,
        ring2,
        coords,
      });
    });

    // =========================================================
    // 7. TRANSIT CORRIDORS (Arched Coral Flight & Yacht Lines)
    // =========================================================
    const transitDestKeys = [
      "ashvem-morjim",
      "assagao-vagator",
      "fontainhas-panaji",
      "divar-chorao-islands",
      "ponda-western-ghats",
      "cabo-de-rama",
    ];

    const transitCurves: THREE.QuadraticBezierCurve3[] = [];

    for (let i = 0; i < transitDestKeys.length - 1; i++) {
      const p1 = SANCTUARY_COORDINATES[transitDestKeys[i]];
      const p2 = SANCTUARY_COORDINATES[transitDestKeys[i + 1]];
      if (!p1 || !p2) continue;

      const mid = new THREE.Vector3(
        (p1.x + p2.x) * 0.5,
        Math.max(p1.y, p2.y) + 10,
        (p1.z + p2.z) * 0.5
      );
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(p1.x, p1.y + 1, p1.z),
        mid,
        new THREE.Vector3(p2.x, p2.y + 1, p2.z)
      );
      transitCurves.push(curve);

      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const curveMat = new THREE.LineDashedMaterial({
        color: 0xff696b,
        linewidth: 1.5,
        dashSize: 2.5,
        gapSize: 2.0,
        transparent: true,
        opacity: 0.5,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      line.computeLineDistances();
      mapGroup.add(line);
    }

    // Moving telemetry light pulse along corridors
    const pulseGeo = new THREE.SphereGeometry(0.7, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const corridorPulse = new THREE.Mesh(pulseGeo, pulseMat);
    mapGroup.add(corridorPulse);

    // =========================================================
    // 8. CAMERA & ORBITAL NAVIGATION (Clamped & Damped)
    // =========================================================
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRotY = 0;
    let targetRotX = 0;
    let targetCameraPos = new THREE.Vector3(0, 140, 165);
    let targetCameraLook = new THREE.Vector3(0, 5, 0);

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
        targetRotX += dy * 0.003;
        // Clamp pitch so user never flips underneath the pedestal!
        targetRotX = Math.max(-0.25, Math.min(0.5, targetRotX));
        prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hitTargets);
        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData.destination as Destination;
          setHoveredDest(hovered);
          domElement.style.cursor = "pointer";
        } else {
          setHoveredDest(null);
          domElement.style.cursor = "grab";
        }
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;

      const rect = domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hitTargets);
      if (intersects.length > 0) {
        const selected = intersects[0].object.userData.destination as Destination;
        onSelectDestination(selected);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.12;
      targetCameraPos.y = Math.max(90, Math.min(220, targetCameraPos.y + delta));
      targetCameraPos.z = Math.max(105, Math.min(260, targetCameraPos.z + delta * 1.1));
    };

    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("wheel", onWheel, { passive: false });

    // Touch support for mobile devices
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        targetRotY += dx * 0.006;
        targetRotX += dy * 0.004;
        targetRotX = Math.max(-0.25, Math.min(0.5, targetRotX));
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const diff = (touchStartDist - dist) * 0.2;
        targetCameraPos.y = Math.max(90, Math.min(220, targetCameraPos.y + diff));
        targetCameraPos.z = Math.max(105, Math.min(260, targetCameraPos.z + diff * 1.1));
        touchStartDist = dist;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // =========================================================
    // 9. ANIMATION LOOP
    // =========================================================
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Atmospheric slow rotation when idle
      if (!isDragging) {
        targetRotY += 0.0004;
      }

      mapGroup.rotation.y += (targetRotY - mapGroup.rotation.y) * 0.06;
      mapGroup.rotation.x += (targetRotX - mapGroup.rotation.x) * 0.06;

      // Animate Beacon Radar Pulse Rings
      beaconMeshes.forEach(({ dest, core, beam, ring1, ring2, coords }) => {
        const isSelected = activeDestRef.current?.id === dest.id;

        // Expanding waves
        const speed = isSelected ? 3.5 : 2.0;
        const pulse1 = ((elapsedTime * speed + coords.x * 0.1) % 2) / 2;
        const pulse2 = ((elapsedTime * speed + coords.x * 0.1 + 0.5) % 2) / 2;

        ring1.scale.set(1 + pulse1 * 3.5, 1 + pulse1 * 3.5, 1);
        (ring1.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.9 - pulse1);

        ring2.scale.set(1 + pulse2 * 4.2, 1 + pulse2 * 4.2, 1);
        (ring2.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - pulse2);

        // Core emphasis when selected
        if (isSelected) {
          core.scale.set(1.4, 1.4, 1.4);
          (core.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.6;
          beam.scale.set(1.4, 1.3, 1.4);
          (beam.material as THREE.MeshBasicMaterial).opacity = 0.9;
        } else {
          core.scale.set(1.0, 1.0, 1.0);
          (core.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
          beam.scale.set(1.0, 1.0, 1.0);
          (beam.material as THREE.MeshBasicMaterial).opacity = 0.5;
        }
      });

      // Animate transit corridor pulse
      if (transitCurves.length > 0) {
        const totalProgress = (elapsedTime * 0.4) % transitCurves.length;
        const curveIdx = Math.floor(totalProgress);
        const curveFrac = totalProgress - curveIdx;
        const pt = transitCurves[curveIdx].getPoint(curveFrac);
        corridorPulse.position.copy(pt);
      }

      // Smooth Camera tracking to selected sanctuary
      if (activeDestRef.current) {
        const activeCoords = SANCTUARY_COORDINATES[activeDestRef.current.id];
        if (activeCoords) {
          targetCameraLook.set(activeCoords.x * 0.5, activeCoords.y + 4, activeCoords.z * 0.5);
        }
      }

      camera.position.lerp(targetCameraPos, 0.05);
      camera.lookAt(targetCameraLook);

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
      domElement.removeEventListener("wheel", onWheel);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectDestination]);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#011820] via-[#00242e] to-[#011820] border border-white/5 shadow-2xl">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Hover Indicator HUD */}
      {hoveredDest && (
        <div className="pointer-events-none absolute top-6 left-6 bg-[#002d37]/95 backdrop-blur-md border border-coral-500/50 rounded-2xl px-5 py-3 shadow-2xl transition-all duration-200">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-ping" />
            Waypoint Telemetry
          </div>
          <div className="text-white font-medium text-base font-serif mt-0.5">
            {hoveredDest.name}
          </div>
          <div className="text-sand-300 text-xs font-mono mt-0.5 flex items-center gap-2">
            <span>{hoveredDest.coordinates[0]}° N, {hoveredDest.coordinates[1]}° E</span>
            <span className="text-white/20">•</span>
            <span className="text-coral-300 font-semibold">{hoveredDest.weather.temp}</span>
          </div>
        </div>
      )}

      {/* Sanctuaries Direct Quick Jump Pill Bar */}
      <div className="absolute top-4 right-4 hidden md:flex flex-wrap max-w-xs justify-end gap-1.5 z-10">
        {DESTINATIONS.map((d) => {
          const isSelected = selectedDestination?.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDestination(d)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all duration-200 ${
                isSelected
                  ? "bg-coral-500 text-white font-semibold shadow-md shadow-coral-500/30 border border-coral-400"
                  : "bg-[#002d37]/80 hover:bg-[#003642] text-sand-300 hover:text-white border border-white/10"
              }`}
            >
              {d.name.split("&")[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Legend & Controls Guide */}
      <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-3 text-[10px] text-sand-400 font-mono bg-[#002d37]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
        <span className="flex items-center gap-1.5 text-coral-300">
          <span className="inline-block w-2 h-2 rounded-full bg-coral-400 animate-pulse" />
          Sanctuary Beacon
        </span>
        <span className="text-white/20">|</span>
        <span className="text-sand-300">Drag to orbit • Scroll to zoom</span>
      </div>
    </div>
  );
};
