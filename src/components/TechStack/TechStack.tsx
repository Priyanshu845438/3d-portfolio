import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

export const techItems = [
  // Core Selection for high-impact visual
  { text: "Python", bgColor: "#3776ab", textColor: "#ffd43b" },
  { text: "JS", bgColor: "#f7df1e", textColor: "#000000" },
  { text: "TS", bgColor: "#3178c6", textColor: "#ffffff" },
  { text: "Node", bgColor: "#339933", textColor: "#ffffff" },
  { text: "React", bgColor: "#61dafb", textColor: "#000000" },
  { text: "Next.js", bgColor: "#000000", textColor: "#ffffff" },
  { text: "Mongo", bgColor: "#47a248", textColor: "#ffffff" },
  { text: "SQL", bgColor: "#336791", textColor: "#ffffff" },
  { text: "Postgre", bgColor: "#336791", textColor: "#ffffff" },
  { text: "Docker", bgColor: "#2496ed", textColor: "#ffffff" },
  { text: "Git", bgColor: "#f05032", textColor: "#ffffff" },
  { text: "AWS", bgColor: "#ff9900", textColor: "#232f3e" },
  { text: "PySpark", bgColor: "#e25a1c", textColor: "#ffffff" },
  { text: "NestJS", bgColor: "#e0234e", textColor: "#ffffff" },
  { text: "PHP", bgColor: "#777bb4", textColor: "#ffffff" },
  { text: "ETL", bgColor: "#64748b", textColor: "#ffffff" },
  { text: "LLM", bgColor: "#8b5cf6", textColor: "#ffffff" },
  { text: "PowerBI", bgColor: "#f2c811", textColor: "#000000" },
  { text: "HTML", bgColor: "#e34f26", textColor: "#ffffff" },
  { text: "CSS", bgColor: "#1572b6", textColor: "#ffffff" },
  { text: "REST API", bgColor: "#0284c7", textColor: "#ffffff" },
  { text: "Prisma", bgColor: "#2d3748", textColor: "#ffffff" },
  { text: "Agile", bgColor: "#0052cc", textColor: "#ffffff" }
];

const createTextTexture = (text: string) => {
  const bgColor = "#CCFBF1"; 
  const textColor = "#047857"; 
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 512, 512);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      if (currentLine.length + words[i].length + 1 <= 8) {
        currentLine += " " + words[i];
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    let fontSize = 160;
    if (lines.length > 1) fontSize = 110;
    const maxLen = Math.max(...lines.map(l => l.length));
    if (maxLen > 5) fontSize = Math.min(fontSize, 450 / maxLen);

    ctx.font = `800 ${fontSize}px "Inter", sans-serif`;
    ctx.fillStyle = textColor;

    const lineHeight = fontSize * 1.2;
    const startY = 256 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, 256, startY + (index * lineHeight));
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const textures = techItems.map(tech => createTextTexture(tech.text));

const sphereGeometry = new THREE.SphereGeometry(1, 40, 40);

const spheres = techItems.map(() => ({
  scale: [0.75, 1, 0.85, 0.95, 1.1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(10), r(10) - 10, r(10) - 5]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workElem = document.getElementById("work");
      if (workElem) {
        const threshold = workElem.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          metalness: 0.1,
          roughness: 0.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="skills" style={{ position: "relative", zIndex: 3 }}>
      <h2 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0, opacity: 0.15, pointerEvents: "none", fontSize: "clamp(3rem, 10vw, 150px)", textAlign: "center", width: "100%", textTransform: "uppercase", letterSpacing: "5px", color: "white", fontWeight: "900", whiteSpace: "nowrap" }}>
        MY TECHSTACK
      </h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={3.5} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          intensity={2}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#000000" aoRadius={1} intensity={0.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
