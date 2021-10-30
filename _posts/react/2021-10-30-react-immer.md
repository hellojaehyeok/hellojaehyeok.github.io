---
layout: single
title:  "React Immer 불변성 관리"
excerpt : "React Redux 기초 및 사용법"

categories:
  - React
tags: 
  - [React, Redux]

date: 2021-10-30
last_modified_at: 2021-10-30

---

React에서는 배열이나 객체를 직접적으로 수정하면 안되고      
불변성을 지켜주면서 업데이트해 주어야 합니다.    
오늘 소개해드릴 내용은 불변성을 쉽게 관리하기 위해 만들어진 Immer 라이브러리입니다.       
React를 하면서 저는 사용하지 않지만 redux를 공부하다가 흥미로워 포스팅합니다!           

예를들어
```javascript
const data = {
  a: 1,
  b: 2
};
data.c = 3;
```
이런 형식이 아닌
```javascript
const data = {
  a: 1,
  b: 2
};
const newData = {
  ...javascript,
  c: 3
};
// 혹은
const data = {
  a: 1,
  b: 2
};
let newData = data;
newData.c=3;
data={...newData}
```
이런 식으로 업데이트하기 위하여 `...`스프레드 연산자를 사용합니다.            
      
데이터의 양이 많아지면 관리하기 점점 힘들어집니다.      
      
## immer
```
npm i immer
```
우선 설치를 해주고 사용할 곳에서 import 합니다.             
주로 produce라는 이름을 사용합니다.      
      
produce는 총 두 개의 파라미터를 넘깁니다.      
첫번째 . 수정하고 싶은 데이터를 넣습니다.      
두번째 . 어떤 식으로 변경할지 넣습니다.      
```javascript
import produce from 'immer';
.
.
.
const data = {
  a: 1,
  b: 2
};

const newDate = produce(state, draft => {
  draft.a += 1;
});
// {a : 2, b : 2}
```

---
간단하게 immer에 대하여 알아보았는데요    
구글링을 해보니 immer를 사용하지 않는 게 더 빠르다고 합니다.    
아마 저는 redux에서 handleActions 할 때만 사용하고 다른 곳에서는 사용하지 않을 것 같습니다. :)    

---
```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```