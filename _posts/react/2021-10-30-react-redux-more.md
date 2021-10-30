---
layout: single
title:  "React Redux 추가정리"
excerpt : "React Redux 기초 및 사용법"

categories:
  - React
tags: 
  - [React, Redux]

date: 2021-10-30
last_modified_at: 2021-10-30

---

안녕하세요!       
[이전 글](https://hellojaehyeok.github.io/react/react-redux/)에서 redux를 활용했었는데요.       
사실 제대로 이해하고 넘어가지 못한 부분이 많아 추가적으로 공부하였고        
이 글은 그것을 정리하는 글입니다.       

저는 `redux-actions`라는 라이브러리를 사용하고 있습니다.

# 개념정리

## Store
상태(데이터)를 저장하는 공간입니다.
전역에서 사용하는 JSON데이터라고 생각하면 됩니다.

## Action
store 저장소에 정보를 전달하기 위한 데이터 묶음입니다.      
store에서 직접적으로 데이터를 변경하는 것은 불가능하기에       
저희는 꼭 action을 활용해야 합니다.      

action은 아래와 같은 오브젝트 형식입니다.
```
{
    type: "액션의 종류를 한번에 식별할 수 있는 문자열 혹은 심볼",
    payload: "액션의 실행에 필요한 임의의 데이터",
}
```

## Reducer
action에서 변경한 데이터를 기존에 있는 store와 합치는 역할을 합니다.      
      
* action(변경된 데이터) + 기존데이터 => reducer => 새로운 데이터      
      
하나의 reducer로 많은 상태 관리가 가능하지만 프로젝트 규모가 커지만 분기 처리가 많아지고,       
관리하기가 어려워집니다. 저는 그래서 reducer를 세분화 시키는데요.       
이 경우 `combineReducers`라는 redux 내장함수를 사용하여 퍼져있는 reducer를 합쳐줍니다.       

## bindActionCreators
만들어진 action을 reducer로 넘기기 위해서는 dispatch라는 함수에 넘겨주어야 합니다.    
`mapDispatchToProps` action 생성부터 dispatch의 실행까지        
한 번에 이뤄질 수 있도록 정의하고 props에 넘겨준다. 라는 아이가 있지만     

저는 `bindActionCreators`를 사용하여 그 과정을 생략하고 액션 함수들을 자동으로 바인딩 해줍니다.   


# redux-actions
action을 생성하고 리듀서를 사용하여 액션을 컨트롤하는 코드를 간단하게 만들어줍니다.

## createAction
액션을 만드는 함수입니다.
``` javascript
// 액션 타입을 정의합니다.
const UPDATE_FRUIT = 'uesr/fruit';
// 액션 생성 함수를 만듭니다.
export const updateFruit = createAction(UPDATE_FRUIT);
```

## handleActions
원래는 액션의 type에 따라 switch문으로 분기 처리를 해줍니다.       
이렇게 되면 가독성이 떨어지고 오류가 날 확률이 높아집니다.       
이를 해결하기 위하여 `handleActions`를 사용합니다.       
``` javascript
handleActions({
  [UPDATE_FRUIT]: (state, action) => {
    return {...state, fruit : action.payload.fruit}
  },
}, initialState);
```
이전 글에서는 immer를 사용했었습니다.
```
return produce(state, draft => {
    draft.fruit = action.payload.fruit ? action.payload.fruit : draft.fruit;
});
```
이런 식으로 사용하게 되면 액션에서 원하는 데이터가 잘 넘어오지 않았거나 잘못된 key 값으로       
넘어올 경우 핸들링이 가능합니다. 물론 immer를 사용하지 않고도 가능한 코드입니다.       




---

redux를 게속 제대로 이해하지 못한 상태에서 사용하다 보니        
그때마다 계속 찜찜했었는데 이번에 조금이나마 이해를 하게 된 것 같아 좋습니다. :)

[여기](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6)와 [여기](https://velopert.com/3358)에 정말 잘 정리되어있습니다!

---
```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```