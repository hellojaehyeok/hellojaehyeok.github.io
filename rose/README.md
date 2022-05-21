# Merry Christmas

2020년 크리스마스 기념으로 비주얼코딩을 진행하였습니다.

scene을 생성 후 CubeTextureLoader로 배경을 로드하였습니다.

    const scene = new THREE.Scene();
    let url = [
        '../img/bg/blizzard_ft.jpg',
        '../img/bg/blizzard_bk.jpg', 
        '../img/bg/blizzard_up.jpg',
        '../img/bg/blizzard_dn.jpg',
        '../img/bg/blizzard_rt.jpg',
        '../img/bg/blizzard_lf.jpg',
    ]
    let loader = new THREE.CubeTextureLoader();
    scene.background = loader.load(url);



구체를 생성하고 반사 값과 투명도를 조절하여 유리처럼 보이도록 하였습니다.

    const textureCube = new THREE.CubeTextureLoader().load( url);
    textureCube.mapping = THREE.CubeRefractionMapping;

    const geometry = new THREE.SphereGeometry( 4.5, 32, 32 );
    const material = new THREE.MeshPhongMaterial( {color: 0xffffff , envMap: textureCube, refractionRatio: 0.98, reflectivity: 0.9} );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );


    