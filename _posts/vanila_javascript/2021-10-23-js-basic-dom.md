---
layout: single
title:  "DOM Node, Element 기초 정리"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript, DOM]

date: 2021-10-23
last_modified_at: 2021-10-23
---

안녕하세요!           
오늘은 인터랙션 코딩이나 순수js 프로젝트를 할 때 많이 활용하는           
DOM의 Node와 Element에 대해 알아보겠습니다.           

## Node vs Element 
우선 두 개의 차이점을 간단하게 알아보겠습니다.           
Node에는 여러 가지 타입이 있습니다. (큰 틀이라고 생각하시면 됩니다.)           
```
Node.ELEMENT_NODE
Node.ATTRIBUTE_NODE	
Node.TEXT_NODE
Node.CDATA_SECTION_NODE
Node.PROCESSING_INSTRUCTION_NODE
Node.COMMENT_NODE	
Node.DOCUMENT_NODE	
Node.DOCUMENT_TYPE_NODE	
Node.DOCUMENT_FRAGMENT_NODE	
```

`Node.ELEMENT_NODE`가 html에서 사용하는 HTMLElement입니다.       
`Node.TEXT_NODE`는 일반 텍스트 요소입니다.                  
`Node.COMMENT_NODE`는 주석이라고 생각하시면 됩니다.           

[여기](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)에 정리되어있습니다.           
           

## Property
이제 node와 element를 활용해햐 하는데 사용하는 프로퍼티가 각각 다릅니다.               
예를 들어 아래와 같이 html 요소들이 있고 스크립트로 testDiv와 자식 요소에 접근하겠습니다.                 
```html
<div class="testDiv">
    <p>Hello World</p> This is text
</div>
```


##### 일반 접근
testDiv를 콘솔에 찍어보면 div 자체에 접근합니다.              
```javascript
console.log(testDiv);
 
/*
  <div class="testDiv">
    <p>Hello World</p>
    "This is text"
  </div>
*/
```


##### 자식 element (children)
element 속성인 children를 사용하면 텍스트를 제외한 요소만 가져옵니다.             
즉 위 node 속성에서 말한 `Node.TEXT_NODE`가 아닌 `Node.ELEMENT_NODE`에 접근하는 겁니다.          
```javascript
console.log(testDiv.children);
// HTMLCollection [p]
```


##### 자식 Node (childNodes)
이제 childNodes를 활용하여 node 자체에 접근해 보겠습니다.
```javascript
console.log(testDiv.childNodes);
// NodeList(3) [text, p, text]
```
아래 리스트와 같이 자식에 있는 모든 node를 반환합니다.
1. This is text
2. `<p>Hello World</p>`
3. Hello World

이어지는 글에서 활용법을 알아보겠습니다.







<br />
```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```