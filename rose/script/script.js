async function loadWebGL() {
  // setting
  const { scene, textureCube } = initScene();
  const camera = initCamera();
  const renderer = initRenderer();
  new THREE.OrbitControls(camera, renderer.domElement);
  initLight(scene);
  const composer = initEffect(scene, camera, renderer);

  // obj
  const rose = await loadRose(scene, textureCube);

  // animation
  (function renderScene() {
    requestAnimationFrame(renderScene);
    rose.rotation.y += 0.008;
    composer.render();
  })();
}
loadWebGL();

function initScene() {
  const scene = new THREE.Scene();
  let backgroundSrc = [
    "./img/bg/4.jpg",
    "./img/bg/1.jpg", // 1
    "./img/bg/5.jpg", // sky 5
    "./img/bg/2.jpg", // ground 2
    "./img/bg/6.jpg",
    "./img/bg/3.jpg", // 3
  ];
  const backgroundLoader = new THREE.CubeTextureLoader();
  scene.background = backgroundLoader.load(backgroundSrc);

  const textureCube = new THREE.CubeTextureLoader().load(backgroundSrc);
  textureCube.mapping = THREE.CubeRefractionMapping;

  return { scene, textureCube };
}

function initCamera() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(
    75,
    windowWidth / windowHeight,
    0.1,
    1000
  );
  camera.position.set(2, 10, -130);
  camera.lookAt(0, 0, 0);
  return camera;
}

function initRenderer() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  document.getElementById("rose").appendChild(renderer.domElement);
  renderer.setSize(windowWidth, windowHeight);
  window.addEventListener("resize", function () {
    let width = windowWidth;
    let height = windowHeight;
    renderer.setSize(width, height);
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
}

function initLight(scene) {
  const ambient = new THREE.AmbientLight(0xffffff);
  const pointLight = new THREE.PointLight(0xffffff, 10);

  scene.add(ambient);
  scene.add(pointLight);
}

async function loadRose(scene, envMap) {
  let object3d = new THREE.Object3D();
  await new Promise((resolve) => {
    new THREE.OBJLoader().load("./obj/rose.obj", function (object) {
      const materialObj = new THREE.MeshPhongMaterial({
        color: 0xccddff,
        envMap,
        refractionRatio: 0.98,
      });
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = materialObj;
        }
      });

      object.position.set(1, -20, 1);
      object.scale.set(1, 1, 1);
      object3d = object;
      scene.add(object3d);
      resolve();
    });
  });
  return object3d;
}

function initEffect(scene, camera, renderer) {
  const composer = new POSTPROCESSING.EffectComposer(renderer);
  composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

  const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    new POSTPROCESSING.BloomEffect()
  );
  effectPass.renderToScreen = true;
  composer.addPass(effectPass);
  return composer;
}
