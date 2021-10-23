---
layout: single
title:  "canvas 없이 div로 대각선 그리기"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript, Math]

date: 2021-10-24
last_modified_at: 2021-10-24
---

안녕하세요!       
오늘은 div로 대각선을 그려볼 겁니다.

![image](https://user-images.githubusercontent.com/62782245/138549064-7cfb70e1-db6a-477f-8e71-493993d07390.png)

대각선을 이용하여 많은 것들을 할 수 있고      
저는 위와 같은 유전자 막대그래프를 만드는 프로젝트가 있어 활용했습니다!       

canvas로 할 수도 있지만 저는 아직..canvas를......😢😢      


핵심 기능은 세 가지 입니다.
1. 두 점의 x, y좌표 알아내기
2. 피타고라스 정리
3. 두 점사이의 각도 구하기 (atan2)

## x, y좌표 알아내기
저는 두개의 div를 서로 잇는 선을 만들겁니다.        
그렇기 위해서 div의 우측중앙좌표와 좌측중앙좌표가 필요합니다.          

![image](https://user-images.githubusercontent.com/62782245/138549320-f25803b2-0de8-43fd-9dd6-55fa0b6fcc07.png)

대충 이정도 느낌입니다.       
offsetLeft, offsetWidth, offsetTop, offsetHeight로 x, y좌표를 구합니다.

첫번째 x, y좌표 구하기
```
x -> offsetLeft + offsetWidth 
y -> offsetTop + (offsetHeight / 2)
```
두번째 x, y좌표 구하기
```
x -> offsetLeft
y -> offsetTop + (offsetHeight / 2)
```

## 피타고라스 정리
두 점의 좌표를 알았으니 이제 길이를 알아야 합니다.      
`a² + b² = c²` 식을 이용해야 합니다.        
가로와 세로의 길이는 좌표를 통해 얻어올 수 있으니 이제 계산식을 세우면 됩니다.        

```javascript
Math.sqrt(
  Math.pow( (firstXY.x - secondXY.x), 2) + Math.pow((firstXY.y - secondXY.y), 2)
)
```
`Math.pow()` 제곱해줍니다.        
`Math.sqrt()` 루트를 의미합니다.        

## atan2 (아크탄젠트)
마지막입니다.        
대각선의 길이를 구했으니 두 좌표를 서로 이어지게 하기 위하여 각도를 구해야 합니다.        
atan2라는 것을 이용하여야 합니다.        
일반 atan랑 차이점은 음수도 허용한다는 것입니다.        

`Math.atan2` 사용법입니다.        
```javascript 
  const x = 첫번째x - 두번째x
  const y = 첫번째y - 두번째y;
  const radian = Math.atan2(Math.abs(y), Math.abs(x));
  const degree = radian * 180 / Math.PI // 라디안 -> 디그리 변환
```


이 세 가지 방법을 사용하면 그래프 같은 복잡한 것들을 만들 수 있습니다.      
실제 프로젝트에서 수학 계산식을 처음 써봤는데요.      
상당히 재밌었습니다. 다만 div를 생성하고 그것을 제어하기 때문에      
속도 측면에서는 느릴 수도 있습니다.      

      
얼른 canvas를 공부해야겠습니다.      

## 실제 코드 예시
```javascript
  <div class="parent">
      <div class="first">First Div</div>
      <div class="second">Second Div</div>
  </div>


  <script>
      const _first = document.querySelector(".first");
      const _second = document.querySelector(".second");
      const _parent = document.querySelector(".parent");

      // 대각선을 그려주는 함수입니다.
      // (첫번째 요소, 두번째 요소, 부모요소)
      const drawDiagonal = (first, second, parent) => {
          // 좌표구하기
          const firstXY = {
              x : first.offsetLeft + first.offsetWidth,
              y : first.offsetTop + (first.offsetHeight/2),
          }
          const secondXY = {
              x : second.offsetLeft,
              y : second.offsetTop + (second.offsetHeight/2),
          }

          // 대각선 길이 구하기
          const diagonalWidth = Math.sqrt(
                              Math.pow( (firstXY.x - secondXY.x), 2) + Math.pow( (firstXY.y - secondXY.y), 2)
                          )
                          
          // 각도 구하기
          const atanX = firstXY.x - secondXY.x
          const atanY = firstXY.y - secondXY.y;
          const radian = Math.atan2(Math.abs(atanY), Math.abs(atanX));
          const degree = radian * 180 / Math.PI // 라디안 -> 디그리 변환
                          
          // 그리기
          // class를 따로 만들어 스타일을 제어해도 괜찮습니다.
          const diagonal = document.createElement('div');
          diagonal.style.width = diagonalWidth + "px";
          diagonal.style.position = "absolute";
          diagonal.style.top = firstXY.y + "px";
          diagonal.style.left = firstXY.x + "px";
          diagonal.style.transformOrigin = `0 0`;
          diagonal.style.transform = `rotate(${degree}deg)`;
          diagonal.style.borderTop = "1px solid #000";
          parent.appendChild( diagonal ); 
      }
      
      
      drawDiagonal(_first, _second, _parent)
  </script>
```
결과물입니다!

![image](https://user-images.githubusercontent.com/62782245/138564719-a5474220-cfc1-45b9-acfe-615b7cacb6fa.png)

<br />
```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```