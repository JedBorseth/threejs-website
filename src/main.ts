import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// Setup Scene, add camera/renderer
const carScale = 150;
const helpers = false;
const maxZoom = 30;
const gltfLoader = new GLTFLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg")?.appendChild(renderer.domElement);
console.log(renderer);
// Draw Shapes
gltfLoader.load("../car/scene.gltf", (gltf) => {
  gltf.scene.scale.set(carScale, carScale, carScale);
  document.body.addEventListener("wheel", () => {
    gltf.scene.rotation.y += 0.3;
    console.log("hi");
  });
  scene.add(gltf.scene);
});
// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const mainLight = new THREE.AmbientLight(0xffffff);
scene.add(mainLight, pointLight);
// Helpers
if (helpers) {
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper);
}

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

//
//
//
// Animation Loops

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -1.1;
  camera.position.y = t * -1.1;
  console.log(camera.position.z);
  // torusKnot.rotation.y = t * 0.01;
  // torusKnot.rotation.x = t * 0.01;
  if (camera.position.z <= maxZoom && camera.position.y <= maxZoom) {
    camera.position.z = maxZoom;
    camera.position.y = maxZoom;
    console.log("hi");
  }
}
document.body.onscroll = moveCamera;
moveCamera();
camera.position.z = maxZoom;
camera.position.y = maxZoom;
camera.position.x = maxZoom;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
