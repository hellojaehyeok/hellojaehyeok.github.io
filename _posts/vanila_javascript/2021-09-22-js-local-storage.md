---
layout: single
title:  "Local Storage 사용하기"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript]

date: 2021-10-04
last_modified_at: 2021-10-04
---


Local Storage는 브라우저 세션 간에 공유되는 데이터베이스라고 생각하시면 됩니다.          
유사하게 Session Storage라는 것도 있습니다.          
          
로컬 스토리지는 데이터가 만료되지 않고 세션 스토리지는 페이지 세션이 끝날 때           
(페이지를 닫을 때) 사라지는 차이점이 있습니다.          
          
## 사용법
사용법은 아래와 같이 간단합니다.


데이터 저장하기
```javascript
localStorage.setItem( "dataName", --- );
```

데이터 가져오기
```javascript
let localData = localStorage.getItem("dataName");
```

데이터 일부분 삭제하기
```javascript
localStorage.removeItem('dataName')
```

데이터 전제 제거하기
```javascript
localStorage.clear();
```

## 주의사항 
1. key와 value로 구성되있어야 합니다.
2. value는 반드시 문자열로 저장됩니다.

중요한 점은 문자열로 저장된다는 점입니다.         
배열을 저장하거나 오브젝트 형식을 저장할 경우에는         
`JSON.stringify`, `JSON.parse`를 이용해 주세요.         



<br />
```
    🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```