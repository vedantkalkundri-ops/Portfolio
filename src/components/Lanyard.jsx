
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_MODEL = "/assets/lanyard/card.glb";
const PROFILE_IMAGE = "/assets/lanyard/vedant-back.png";
const FRONT_UV_RECT = { x: 0, y: 0, width: 0.5, height: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, width: 0.5, height: 0.757 };

export default function Lanyard({ position = [0, 0, 20], gravity = [0, -40, 0], paused = false }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <div className={`lanyard-wrapper${!paused ? " is-visible" : ""}${!paused ? " no-transition" : ""}`} aria-label="Interactive portfolio badge">
      <Canvas
        camera={{ position, fov: 20 }}
        dpr={[1, isMobile ? 1.25 : 2]}
        gl={{ alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics key={isMobile} gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={paused}>
            <Band isMobile={isMobile} paused={paused} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({ isMobile, paused }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const pointerOffset = useRef(null);
  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF(CARD_MODEL);
  const profileTexture = useTexture(PROFILE_IMAGE);
  const curve = useRef(new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const vector = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const segmentProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImage = baseMap.image;
    const canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    const context = canvas.getContext("2d");
    if (!context || !profileTexture.image) return baseMap;

    context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    const image = profileTexture.image;

    const drawContainedImage = (rect) => {
      const rx = rect.x * canvas.width;
      const ry = rect.y * canvas.height;
      const rw = rect.width * canvas.width;
      const rh = rect.height * canvas.height;
      const scale = Math.min(rw / image.width, rh / image.height) * 0.99;
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      context.save();
      context.beginPath();
      context.rect(rx, ry, rw, rh);
      context.clip();
      context.drawImage(image, rx + (rw - drawWidth) / 2, ry + (rh - drawHeight) / 2, drawWidth, drawHeight);
      context.restore();
    };

    context.fillStyle = "#61625f";
    context.fillRect(0, 0, canvas.width * 0.5, canvas.height * FRONT_UV_RECT.height);
    drawContainedImage(FRONT_UV_RECT);

    const rx = BACK_UV_RECT.x * canvas.width;
    const ry = BACK_UV_RECT.y * canvas.height;
    const rw = BACK_UV_RECT.width * canvas.width;
    const rh = BACK_UV_RECT.height * canvas.height;
    context.save();
    context.fillStyle = "#f5f5f5";
    context.fillRect(rx, ry, rw, rh);
    context.fillStyle = "rgba(0, 0, 0, 0.72)";
    context.fillRect(rx, ry + rh * 0.83, rw, rh * 0.17);
    context.fillStyle = "#ffffff";
    context.font = `700 ${Math.round(rw * 0.068)}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("vedantkalkundri-ops", rx + rw / 2, ry + rh * 0.915, rw * 0.92);
    context.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = baseMap.flipY;
    texture.anisotropy = 16;
    return texture;
  }, [profileTexture, materials.base.map]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (!hovered) return undefined;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => { document.body.style.cursor = "auto"; };
  }, [dragged, hovered]);

  useFrame((state, delta) => {
    if (paused) return;
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current || !band.current) return;

    if (dragged && pointerOffset.current) {
      const point = vector.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      const directionToPoint = direction.current.copy(point).sub(state.camera.position).normalize();
      point.add(directionToPoint.multiplyScalar(state.camera.position.length()));
      [fixed, j1, j2, j3, card].forEach(({ current }) => current.wakeUp());
      card.current.setNextKinematicTranslation({
        x: point.x - pointerOffset.current.x,
        y: point.y - pointerOffset.current.y,
        z: point.z - pointerOffset.current.z,
      });
    }

    [j1, j2].forEach(({ current }) => {
      if (!current.lerped) current.lerped = new THREE.Vector3().copy(current.translation());
      const distance = Math.min(1, Math.max(0.1, current.lerped.distanceTo(current.translation())));
      current.lerped.lerp(current.translation(), delta * distance * 50);
    });

    curve.current.points[0].copy(j3.current.translation());
    curve.current.points[1].copy(j2.current.lerped);
    curve.current.points[2].copy(j1.current.lerped);
    curve.current.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.current.getPoints(isMobile ? 16 : 32));

    const angularVelocity = card.current.angvel();
    const rotation = card.current.rotation();
    card.current.setAngvel({ x: angularVelocity.x, y: angularVelocity.y - rotation.y * 0.25, z: angularVelocity.z });
  });

  return (
    <>
      <group position={isMobile ? [0, 4, 0] : [3, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody ref={j1} position={[0.5, 0, 0]} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody ref={card} position={[2, 0, 0]} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event) => {
              event.stopPropagation();
              event.target.releasePointerCapture(event.pointerId);
              pointerOffset.current = null;
              setDragged(false);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              event.nativeEvent.preventDefault();
              event.target.setPointerCapture(event.pointerId);
              pointerOffset.current = new THREE.Vector3().copy(event.point).sub(vector.current.copy(card.current.translation()));
              setDragged(true);
            }}
          >
            <mesh geometry={nodes.card.geometry}><meshPhysicalMaterial map={cardMap} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} /></mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="#dddcdd" depthTest={false} resolution={[1000, 1000]} lineWidth={0.6} />
      </mesh>
    </>
  );
}
