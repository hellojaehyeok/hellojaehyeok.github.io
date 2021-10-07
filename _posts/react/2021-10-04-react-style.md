---
layout: single
title:  "React 스타일링 & 반응형 쉽게 잡기"
excerpt : "React Styling"

categories:
  - React
tags: 
  - [React, Publishing]

date: 2021-10-07
last_modified_at: 2021-10-07

---


저는 리액트 퍼블리싱을 할 때 styled-components라는 라이브러리를 사용합니다.        

기본 css나 Post css를 사용하여도 괜찮지만 스타일 컴포넌트를 사용하면        
상태 값에 따라 스타일링을 변경하기 쉽기 때문입니다.        


## Styled-Components
아래 명령어로 설치합니다.
```
npm i styled-components
```

return문 안에서 스타일링을 위한 컴포넌트를 만든다고 생각하면 됩니다.        
그 후 외부에서 어떤 태그를 사용할 건지 `styled.`뒤에다가 선언해주면 됩니다.        

꼭 앞 글자는 대문자로 해주세요!         

```javascript
import styled from "styled-components";
import React from 'react';


const PageName = (props) => {

  return(
    <Container>
      <Wrap>
      </Wrap>
    </Container>
  )
};

export default PageName;

const Container = styled.div`
  // css styling 
`
const Wrap = styled.div`
  // css styling 
`
```

### 사용하면 편한 VSCode 확장 프로그램
자세히 보시면 div 뒤에는 문자열이 들어가기에 자동완성이 안됩니다.        
vscode에서 `vscode-styled-components`를 설치하시면 자동완성이 됩니다.        


### props를 넘겨 css분기 처리해주기
상태 bool 값에 따라 css가 달라지는 경우가 많습니다.        
그럴 때 스타일 컴포넌트에다가 props를 넘겨주어 관리합니다.        

넘겨준 값은 아래와 같이 사용할 수 있습니다.        
```javascript
  <Container isActive={isActive}>
  </Container>
  ...
  const Container = styled.div`
    
    ${({isActive}) => {
      return isActive?
      `border:1px solid red;`
      :
      `border:1px solid black;`
    }}
  `
```


## 반응형 쉽게 잡기
저는 반응형을 잡을 때 `calc`를 많이 사용합니다.      
`calc`를 사용하면 코드가 굉장히 길어지고 가독성이 떨어집니다.      
그래서 쉽고 빠르게 퍼블리싱이 가능하도록 js 파일을 따로 만들어      
라이브러리처럼 사용 가능하도록 만들었습니다.      

```javascript
// 기존 css
@media (max-width: 1024px) {
    width: calc(100vw * (300/428));
    margin: calc(100vw * (10/428)) calc(100vw * (15/428)) calc(100vw * (20/428)) calc(100vw * (30/428));
    font-size: calc(100vw * (15, 428));
}

// 변환 css
import {styled, Height, Width, Margin, FontSize} from './mediaStyle.js';
const mediaPxMb = 1024;
const mbSize = 428;
.
.
.
 const Container = styled.div`

  // css styling 
  ${Height(100, mbSize)}

  ${Media(mediaPxMb,[
      Width(400, mbSize),
      Margin(10, 15, 20, 30, mbSize),
      FontSize(15, mbSize),
      "display:flex",
  ])}
`
```

사용법은 간단합니다.      
파일 최상단에서 제가 만든 js파일을 import 해오신 후       
미디어쿼리 분기점과 calc 뒤에서 사용할 값을 정해줍니다.      

아래 스타일 컴포넌트에서 위와 같이 사용하시면 됩니다.      
Width, Margin, FontSize 말고도 많은 스타일이 있습니다 :)      
      
이 js 파일 안에 스타일 컴포넌트도 같이 있으니 styled도 꺼내서 사용 가능합니다.      

```javascript
// 이 태그를 사용하시면
// PC는 PC에서만 Mobile은 모바일에서만 렌더링 됩니다.
<PC></PC>
<Mobile></Mobile>
```

이 방법은 실제 프로젝트에서 사용하였으며      
인터랙션이 많은 사이트임에도 잘 작동하였습니다.       


[여기](https://github.com/hellojaehyeok/For_Coding/blob/master/exampleCode/mediaStyle/mediaStyle.js)서 js코드를 확인해주세요! 






---


```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```