import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { RGBELoader } from "three-stdlib";
import { decryptFile } from "../Character/utils/decrypt";

const VentureCharacter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width || 420;
    const height = rect.height || 450;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    el.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera — same FOV as main character
    const camera = new THREE.PerspectiveCamera(14.5, width / height, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    // Lighting
    const dirLight = new THREE.DirectionalLight(0x5eead4, 1);
    dirLight.position.set(-0.47, -0.32, -1);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3);
    pointLight.position.set(3, 12, 4);
    scene.add(pointLight);

    // HDR environment
    new RGBELoader()
      .setPath("/models/")
      .load("char_enviorment.hdr?v=2", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.environmentIntensity = 0.64;
        scene.environmentRotation.set(5.76, 85.85, 1);
      });

    // Load character
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);

    let mixer: THREE.AnimationMixer | null = null;
    let animFrameId: number;

    decryptFile("/models/character.enc?v=2", "MyCharacter12")
      .then((buf) => {
        const blobUrl = URL.createObjectURL(new Blob([buf]));
        loader.load(blobUrl, async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);

          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              if (mesh.material) {
                if (mesh.name === "BODY.SHIRT") {
                  const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  mat.color = new THREE.Color("#8B4513");
                  mesh.material = mat;
                } else if (mesh.name === "Pant") {
                  const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  mat.color = new THREE.Color("#000000");
                  mesh.material = mat;
                }
              }
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // Set foot positions
          const footR = character.getObjectByName("footR");
          const footL = character.getObjectByName("footL");
          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;

          scene.add(character);

          // Animations
          mixer = new THREE.AnimationMixer(character);
          const introClip = gltf.animations.find((c) => c.name === "introAnimation");
          if (introClip) {
            const action = mixer.clipAction(introClip);
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.play();
          }
          const blinkClip = gltf.animations.find((c) => c.name === "Blink");
          if (blinkClip) {
            mixer.clipAction(blinkClip).play();
          }

          // Typing keys
          ["key1", "key2", "key5", "key6"].forEach((name) => {
            const clip = THREE.AnimationClip.findByName(gltf.animations, name);
            if (clip && mixer) {
              const a = mixer.clipAction(clip);
              a.play();
              a.timeScale = 1.2;
            }
          });

          draco.dispose();
          URL.revokeObjectURL(blobUrl);
        });
      })
      .catch((err) => console.error("VentureCharacter load error:", err));

    // Render loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const w = r.width || 420;
      const h = r.height || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameId);
      scene.clear();
      renderer.dispose();
      if (el && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="venture-character" ref={containerRef} />;
};

export default VentureCharacter;
