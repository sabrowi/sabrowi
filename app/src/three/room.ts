import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Maker-room scene: loads the hand-modeled GLB workspace, maps looping
 * videos onto its three screens (CRT, vertical monitor, 9-panel curved
 * ultrawide), plays the model's built-in animations (robot arm, 3D
 * printer, robot vacuum), and adds drag-to-rotate + day/night lighting.
 */

export interface RoomHandle {
  setNight: (night: boolean) => void;
  dispose: () => void;
}

function makeVideo(src: string) {
  const v = document.createElement("video");
  v.src = src;
  v.muted = true;
  v.loop = true;
  v.playsInline = true;
  v.autoplay = true;
  v.preload = "auto";
  v.play().catch(() => {
    // autoplay fallback: first user interaction starts the videos
    const kick = () => {
      v.play().catch(() => {});
      window.removeEventListener("pointerdown", kick);
    };
    window.addEventListener("pointerdown", kick);
  });
  return v;
}

function videoTexture(video: HTMLVideoElement) {
  const tex = new THREE.VideoTexture(video);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = false; // glTF UV convention
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

export function createRoomScene(container: HTMLElement): RoomHandle {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.cursor = "grab";

  /* camera: framed from the model's own IsoCam (ortho 4.95 x 3.7125) */
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(13.59, 13, 13.59);
  camera.quaternion.set(-0.2391, 0.3696, 0.099, 0.8924);
  const VIEW = 8.6;
  function frame() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    const aspect = w / h;
    camera.left = (-VIEW * aspect) / 2;
    camera.right = (VIEW * aspect) / 2;
    camera.top = VIEW / 2;
    camera.bottom = -VIEW / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  frame();
  const ro = new ResizeObserver(frame);
  ro.observe(container);

  /* my day/night rig on top of the model's punctual lights */
  const hemi = new THREE.HemisphereLight(0xfff4e0, 0x8a97a8, 1.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d6, 2.0);
  sun.position.set(7, 12, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -6;
  sun.shadow.camera.right = 6;
  sun.shadow.camera.top = 6;
  sun.shadow.camera.bottom = -6;
  sun.shadow.bias = -0.0004;
  scene.add(sun);

  const room = new THREE.Group();
  scene.add(room);

  /* ------------------------------ load model ------------------------------ */
  const videos: HTMLVideoElement[] = [];
  let mixer: THREE.AnimationMixer | null = null;
  const glbLights: { light: THREE.Light; base: number }[] = [];
  const disposables: { dispose: () => void }[] = [];

  const loader = new GLTFLoader();
  loader.load("models/maker_room.glb", (gltf) => {
    const model = gltf.scene;
    room.add(model);

    // shadows + collect punctual lights (normalized: glTF exports them in
    // physical candela — up to ~30k cd — which would white out the scene)
    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      } else if (obj instanceof THREE.Light) {
        glbLights.push({ light: obj, base: obj.intensity * 0.0015 });
        obj.intensity *= 0.0015;
        obj.castShadow = false;
      }
    });

    // screen videos
    const vidCrt = makeVideo("videos/screen_crt.mp4");
    const vidVertical = makeVideo("videos/screen_vertical.mp4");
    const vidLandscape = makeVideo("videos/screen_landscape.mp4");
    videos.push(vidCrt, vidVertical, vidLandscape);

    const crtTex = videoTexture(vidCrt);
    const vertTex = videoTexture(vidVertical);
    const landTexes = Array.from({ length: 9 }, (_, i) => {
      const t = videoTexture(vidLandscape);
      t.repeat.set(1 / 9, 1);
      t.offset.set(i / 9, 0);
      return t;
    });
    disposables.push(crtTex, vertTex, ...landTexes);

    model.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const name = obj.name;
      if (name === "CRT_Screen") {
        obj.material = new THREE.MeshBasicMaterial({ map: crtTex, toneMapped: false });
      } else if (name === "Mon2_Screen") {
        obj.material = new THREE.MeshBasicMaterial({ map: vertTex, toneMapped: false });
      } else if (name.startsWith("Mon34_Screen_")) {
        const i = Number(name.split("_").pop());
        obj.material = new THREE.MeshBasicMaterial({ map: landTexes[i], toneMapped: false });
      }
    });

    // built-in animations: robot arm, printer, vacuum
    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer!.clipAction(clip).play();
      });
    }
  });

  /* ------------------------------ interaction ------------------------------ */
  let targetRotY = 0;
  let rotY = 0;
  let dragging = false;
  let lastX = 0;

  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    renderer.domElement.style.cursor = "grabbing";
    renderer.domElement.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (dragging) {
      targetRotY = THREE.MathUtils.clamp(targetRotY + (e.clientX - lastX) * 0.005, -0.6, 0.6);
      lastX = e.clientX;
    } else {
      const rect = renderer.domElement.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetRotY = THREE.MathUtils.clamp(px * 0.22, -0.6, 0.6);
    }
  };
  const onUp = () => {
    dragging = false;
    renderer.domElement.style.cursor = "grab";
  };
  renderer.domElement.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  /* ------------------------------ day / night ------------------------------ */
  let nightTarget = 0; // bright studio by default
  let nightT = 0;
  const sunDay = new THREE.Color(0xfff0d6);
  const sunNight = new THREE.Color(0x7a9bd6);

  /* -------------------------------- animate -------------------------------- */
  const clock = new THREE.Clock();
  let raf = 0;

  function animate() {
    raf = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    nightT += (nightTarget - nightT) * Math.min(dt * 2.5, 1);
    hemi.intensity = THREE.MathUtils.lerp(0.9, 0.12, nightT);
    sun.intensity = THREE.MathUtils.lerp(1.6, 0.15, nightT);
    sun.color.lerpColors(sunDay, sunNight, nightT);
    // model's own practicals shine brighter at night
    const glbScale = THREE.MathUtils.lerp(0.5, 1.25, nightT);
    glbLights.forEach(({ light, base }) => {
      light.intensity = base * glbScale;
    });

    rotY += (targetRotY - rotY) * Math.min(dt * 6, 1);
    room.rotation.y = rotY + Math.sin(t * 0.18) * 0.02;

    if (mixer) mixer.update(dt);
    renderer.render(scene, camera);
  }
  animate();

  return {
    setNight(night: boolean) {
      nightTarget = night ? 1 : 0;
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      videos.forEach((v) => {
        v.pause();
        v.removeAttribute("src");
        v.load();
      });
      if (mixer) mixer.stopAllAction();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const material = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else if (material) material.dispose();
        }
      });
      renderer.domElement.remove();
    },
  };
}
