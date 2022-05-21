





function three(){
    const scene = new THREE.Scene();
    let url = [
        './img/bg/4.jpg',
        './img/bg/1.jpg', // 1
        './img/bg/5.jpg', // sky 5
        './img/bg/2.jpg', // ground 2
        './img/bg/6.jpg',
        './img/bg/3.jpg', // 3
    ]
    let loader2 = new THREE.CubeTextureLoader();
    scene.background = loader2.load(url);

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true ,  antialias: true });
    document.getElementById("rose").appendChild(renderer.domElement);
    control = new THREE.OrbitControls(camera, renderer.domElement);

    //SIZE ---------
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
    })
    renderer.setClearColor( 0x000000, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );

    camera.position.set(2, 10, -130);
    camera.lookAt(0, 0, 0);

    const textureCube = new THREE.CubeTextureLoader().load( url);
    textureCube.mapping = THREE.CubeRefractionMapping;
    
    const ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    pointLight = new THREE.PointLight( 0xffffff, 10 );
    scene.add( pointLight );

    var main = new THREE.Object3D;
    var loader = new THREE.OBJLoader();
    loader.load("./obj/rose.obj", function(object) {
        const materialObj = new THREE.MeshPhongMaterial( {color: 0xccddff , envMap: textureCube, refractionRatio: 0.98} );
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialObj;
            }
        });
    
        object.position.set(1, -20, 1);
        object.scale.set(1, 1, 1);
        main = object;
        scene.add(main);
    });




    let composer;
    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene,camera));

    const effectPass = new POSTPROCESSING.EffectPass(
      camera,
      new POSTPROCESSING.BloomEffect()
    );
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);
            
 
    const renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        main.rotation.y += 0.008;
        console.log(camera.position.x);
        console.log(camera.position.y);
        console.log(camera.position.z);
        composer.render();
    }  
    
}
three();