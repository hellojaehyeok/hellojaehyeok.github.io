---
layout: single
title:  "Canvas 기초 정리"

categories:
  - Canvas
tags: 
  - [Canvas]

date: 2021-10-15
last_modified_at: 2021-10-15

---


안녕하세요!       
canvas 공부 시작할려고합니다!

## 기본 세팅
canvas는 기본적으로 `<canvas></canvas>`태그안에서 이루어집니다.
getElementById로 해당 태그를 가져오고 2d설정과 width, height 설정을 해줍니다.
```javascript
window.onload = function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
```







## n각형 그리기

#### fillRect(x, y, width, height)
색칠된 직사각형을 그립니다.

#### strokeRect(x, y, width, height)
색칠된 직사각형을 그립니다.

### arc(x, y, radius, startAngle, endAngle, anticlockwise)
(x, y) 위치가 원점이고, 반지름 r을 가지고,        
startAngle 에서 시작하여 endAngle 에서 끝나며 주어진       
anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그리게 된다.        

Angle은 라디안 기법을 사용합니다.       
아래 코드를 사용하여 원하는 각도를 변수로 넣는다.        

```javascript
const radianDeg = (deg) => {
    return deg * Math.PI / 180;
}
```


---

업데이트될 글입니다!!


```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```