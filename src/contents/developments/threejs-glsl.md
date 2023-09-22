---
title: 'GLSL을 시작하며'
date: '2023-08-06'
---

대학생 때 [awwwards](https://www.awwwards.com/)를 보며 화려한 인터랙션에 빠져있었고, Threejs와 GLSL로 만든 웹사이트를 보며 Javascript로 만들 수 있는 효과들인지 생각하곤 했다. 직접 만들어보고 싶었지만 Javascript로 겨우 Dom을 조작하는게 전부였던 나에게는 역시 무리였다. 졸업하고 첫 회사를 다닐 때쯤 우연히 [유튜브 영상](https://www.youtube.com/watch?v=DdQn82X1G3I&list=WL&index=26) 하나가 눈에 들어왔다. 그 영상은 평소 해보고 싶었던 인터랙션 중 하나였기에 들뜬 마음으로 보았지만 이해가 가지 않았다. 마음 한켠에 언젠가 꼭 만들자는 다짐을 하고 시간은 그렇게 2년이 지났다. 영상을 최근에서야 다시 보았는데 지금 보니 조금만 공부한다면 그리 어려울 것 같지는 않았다. 더 이상 미룰 수 없다. 항상 마음의 짐이었던 GLSL 이제는 직접 만들어보자.

## Step . 0 문제 쪼개기

우선 큰 문제를 작은 문제로 쪼개서 접근해보겠다.

1. 마크업을 하고 관성 스크롤을 만든다.
2. Threejs를 활용하여 이미지들을 canvas에 그린다.
3. 쉐이더를 적용한다.

## Step . 1 마크업 & 관성스크롤

만들었던 마크업 Dom을 div로 감싸고 `position: fixed;` 로 화면을 고정시킨다. 이러면 스크롤을 하여도 유저는 상단 부분만 보게 된다.

```html
<div css={{position: 'fixed' }} className="scrollable">
  <img src="./foo.jpg" />
  <img src="./bar.jpg" />
</div>
```

translate3d() y값을 [lerp()](https://docs.unity3d.com/ScriptReference/Vector3.Lerp.html)로 제어하여 스크롤을 부드럽게 만든다. `requestAnimationFrame`과 함께 사용하면 스크롤에 따라 콘텐츠의 y값을 매 프레임마다 변경시킬 수 있다.

```ts
let currentScroll = 0; // 유저가 보게되는 스크롤 위치
let targetScroll = 0; // 실제 스크롤 위치
let ease = 0.1;
const scrollable = document.querySelector(`.scrollable`) as HTMLDivElement;

function lerp(start: number, end: number, time: number) {
  return start * (1 - time) + end * time;
}

function setSmoothScroll() {
  targetScroll = window.scrollY;
  currentScroll = lerp(currentScroll, targetScroll, effectEase);
  scrollable.style.transform = `translate3d(0,${-currentScroll}px,0)`;
}
```

## Step . 2 Threejs를 활용한 canvas에 구현

scene, camera, renderer를 설정한다. 이 글은 Threejs 기초 관련 글이 아니기 때문에 구현하고자 하는 인터랙션에만 집중하겠다.

```ts
const perspective = 1000;
const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, getViewport().aspectRatio, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
```

Dom에 있는 이미지는 `visibility: hidden;`으로 처리하고 이미지의 src, 위치, 크기를 가져와서 canvas에 렌더링해야 한다. 아래 함수를 사용하여 렌더링할 Plane의 위치와 크기를 설정한건데, position을 구하는 방법이 헷갈릴 수 있으니 좌표 얘기를 하겠다.

Dom의 좌표는 좌상단이 (0, 0) 이지만, Threejs에서는 3D 좌표계의 중앙이 (0, 0, 0)이다. 중앙에서 위로가면 y는 +되고 아래로 가면 -된다. x는 중앙에서 우측으로 가면 +되고 좌측으로 가면 -된다. 이미지가 화면의 중심에서 얼마나 떨어져 있는지를 구하기 위하여 `getElementDimensions()`를 만들었다. 그림으로 직접 그리면 더 빠르게 이해할 수 있을 것이다.

```ts
function getElementDimensions(element: HTMLElement) {
  const { width, height, top, left } = element.getBoundingClientRect();
  const scale = new THREE.Vector2(width, height);
  const position = new THREE.Vector2(
    left - window.innerWidth / 2 + width / 2,
    -top + window.innerHeight / 2 - height / 2
  );
  return { scale, position };
}
```

위치와 크기를 구했으면 오브젝트를 만들고 scene에 렌더링하면 된다.

```ts
const img = document.querySelector('.img');
scene.add(createMeshImage(img).mesh);

function createMeshImage(element: HTMLImageElement) {
  const geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
  const texture = new THREE.TextureLoader().load(element.src);
  const uniforms = {
    uTexture: { value: texture },
    uOffset: { value: new THREE.Vector2(0, 0) },
    uAlpha: { value: 1 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    fragmentShader,
    vertexShader,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);

  const { position, scale } = getElementDimensions(element);
  mesh.position.set(0, position.y, 0);
  mesh.scale.set(scale.x, scale.y, 1);

  function updateMeshStatus(targetScroll: number, currentScroll: number) {
    const { position, scale } = getElementDimensions(element);
    mesh.position.set(0, position.y, 0);
    mesh.scale.set(scale.x, scale.y, 1);
    uniforms.uOffset.value.set(0, -(targetScroll - currentScroll) * 0.0003);
  }
  return { mesh, updateMeshStatus };
}
```

`new THREE.PlaneGeometry()`로 plane을 만들고 텍스쳐와 쉐이더를 적용하였다. updateMeshStatus()함수를 내부에서 만들고 이 함수를 실행시키면 mesh의 위치와 크기 그리고 uOffset이라는 값을 변경시켜주었다. 다음 스텝에서 uOffset은 무엇인지 쉐이더는 무엇인지 더 자세하게 설명하겠다.

## Step . 3 GLSL (OpenGL Shading Language)

GLSL은 C언어를 기초로 한, 상위 레벨의 셰이딩 언어이다.
컴퓨터로 무언가를 그리는것은 어떤 명령어들의 집합이기도 하다. 쉐이더 역시 명령어들의 집합이다. 다른 점이 있다면 명령어들이 스크린 위에 낱개의 픽셀마다 실행되고 각각의 위치마다 연산이 달라진다고 볼 수 있다. 명령어 셋들 자체가 픽셀의 포지션을 받고 출력하는 하나의 프로그램이자 함수인 셈이다.

GLSL에는 VertexShader(위치), FragmentShader(색상) 두 종류가 있다. 각 쉐이터의 기본 형태는 아래와 같다.

```c
// vertexShader
void main() {
  gl_Position = vec4(1.0, 1.0, 1.0, 1.0 );
}
```

```c
// fragmentShader
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 );
}
```

우리가 하고자 하는 인터랙션을 만들기 위해서 알아야하는 glsl 개념들이 있다.

**uniform**: CPU위의 프로그램에서 GPU위의 shader로 전달하는 방법이다.
uniform으로 선언한 변수는 global 객체에서 고유하며 모든 shader에서 접근할 수 있다. uniform 변수에 어떤 값을 설정, 리셋, 업데이트하기 전까지 그 값을 계속 유지하고 있다.

**varying**: varying은 vertex shader와 fragment shader 간의 데이터 전달을 위해 사용되는 타입이다. vertex shader에서 계산된 값들은 varying으로 선언된 변수에 저장되고, 이 값들은 fragment shader로 보내져 픽셀마다 보간(interpolation)된다. 이로 인해 원활한 쉐이딩 및 색상 전환 효과를 얻을 수 있다.

**uv**: 2D 텍스처 좌표이다. 일반적으로 0부터 1까지의 값으로 텍스처 이미지를 가져올 때 어느 부분을 사용할지 지정한다.

**vUv (varying uv)**: Three.js의 쉐이더에서 전달되는 변수이다. varying 변수로 선언되며, vertex shader에서 계산된 값을 fragment shader로 전달하여 각 픽셀에 텍스처를 적용할 때 사용된다.

**sampler2D**: sampler2D는 2D 텍스처 데이터를 읽어오기 위해 사용되는 타입이다. fragment shader 내에서 텍스처 데이터에 접근하고 처리하기 위해 사용되고 이를 통해 텍스처 이미지를 쉐이더에서 사용할 수 있다.

**texture2D()**: texture2D()는 텍스처 샘플링을 수행하는 함수이다. 주어진 텍스처와 좌표에 따라 텍스처 이미지의 픽셀값을 가져올 수 있다.

**projectionMatrix**: 3D 공간의 좌표를 2D 화면 좌표로 변환하는 데 사용된다. 카메라의 시야각, 종횡비 등을 고려하여 설정된다.

**modelViewMatrix**: 모델의 위치, 회전 및 크기 변환을 나타내며, 모델 좌표를 카메라의 뷰 좌표로 변환한다. 모델 뷰 행렬은 보통 카메라의 뷰 행렬과 모델의 변환 행렬을 곱한 것으로 계산된다. (modeilViewMatix === matrixView \* viewMatrix)

실제 코드를 통해 어떻게 효과를 만들었는지 알아보자.

먼저 vertexShader로 이미지가 굴곡되는 효과를 만들어야 한다.  
함수는 모든 픽셀에 적용됨을 명심해야 한다. 위에서 만들었던 이미지 plane mesh의 각 픽셀 position을 가져와서 uv.x에 파이를 곱하고 sin을 취하여 이미지가 휘어지게 만든다. uOffset으로 휘어지는 정도를 조절할 수 있다. 그리고 uv값을 vUv로 할당하여 position값을 fragmentShader로 넘긴다.

```c
uniform vec2 uOffset;
varying vec2 vUv;

#define M_PI 3.14159265

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
  position.x = position.x + (sin(uv.y * M_PI) * offset.x);
  position.y = position.y + (sin(uv.x * M_PI) * offset.y);
  return position;
}

void main() {
  vUv = uv;
  vec3 newPosition = deformationCurve(position, uv, uOffset);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
```

texture2D와 uVu를 활용하여 이미지를 각 position에 맵핑하고 rgb값을 얻어와 r값만 offset만큼 다르게 적용해준다. r값만 다르게 주면 의도했던 glitch 효과를 만들 수 있다.

```c
uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;
varying vec2 vUv;

vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
  float r = texture2D(textureImage,uv + offset).r;
  vec2 gb = texture2D(textureImage,uv).gb;
  return vec3(r,gb);
}

void main() {
  vec3 color = rgbShift(uTexture,vUv,uOffset);
  gl_FragColor = vec4(color,uAlpha);
}
```
