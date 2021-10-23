---
layout: single
title:  "DOM Node, Element 활용"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript, DOM]

date: 2021-10-23
last_modified_at: 2021-10-23
---

안녕하세요!       
저번 글에서는 Dom Node와 Element 기초에 대해 알아보았는데요       
이번에는 활용하는 방법을 알아보겠습니다.       

## element 추가
`createElement()`로 태그를 만들어줍니다.       
`appendChild()`를 이용하여 원하는 곳에 넣어줍니다.   
appendChild는 자식 노드의 마지막에 노드를 삽입시켜줍니다.
       
`classList`와 `setAttribute`를 이용하면 클래스나 속성을 넣을 수 있습니다.       
```javascript
var parent = document.querySelector(".parent");
var child = document.createElement('div');
parent.appendChild( child ); 

// child.classList.add("graphElName");
// child.setAttribute("data-text", "hello");
```

## element 삭제
`remove()`를 사용하면 해당 element가 삭제됩니다.       
```javascript
var parent = document.querySelector(".parent");
parent.remove();
```

---


## node 삭제
`removeChild()`는 노드를 삭제합니다.
```javascript
parentNode.removeChild(deleteNode)
-> 부모노드.removeChild(삭제할 노드)
```

## 특정 위치 앞에 node 삽입
`insertBefore()`는 node를 특정 node 앞으로 옮겨줍니다.
```javascript
parentNode.insertBefore(newNode, referenceNode)
-> 부모노드.insertBefore(옮길노드, 기준노드)
```

## 노드 교체
`replaceChild()`는 node를 교체해줍니다.

```javascript
parentNode.replaceChild(newNode, oldNode)
-> 부모노드.replaceChild(새로운노드, 교체될노드)
```
 
---

💥💥💥     
위에서 사용한 예시 중 parentNode가 붙은것들은 받드시       
자식요소가 아닌 부모노드에서 활용해야 합니다!!         
💥💥💥      

최근에 드래그&드롭으로 순서를 바꿀 수 있는 그래프와 테이블을      
만들면서 활용했던 코드들입니다 :)

node를 활용하면 더 많은 인터랙션이 가능할 것 같습니다.


<br />
```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```