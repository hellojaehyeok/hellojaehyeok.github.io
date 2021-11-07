---
layout: single
title:  "React 최적화 memo"

categories:
  - React
tags: 
  - [React]

date: 2021-11-07

---

안녕하세요!             
React 최적화 방법 중 하나인 memo에 대하여 알아볼 겁니다.          
사실 memo를 굳이 사용하지 않아도 웹은 잘 돌아갑니다.          
하지만 프론트엔드 개발자라면 렌더링 성능 최적화에는 관심이 있어야 하고           
조금이라도 더 나은 사용자 경험을 줄 수 있어야 한다고 생각합니다.          
         
          
본격적으로 들어가기에 앞서 개념 하나만 정리하겠습니다.          
react-hook은 jsx를 반환하기 위한 함수입니다.          
즉 리턴문을 불러오기 위하여 함수안에 있는 모든 변수, 함수를 매번 다시 선언합니다.          
          
memo는 이러한 불필요한 렌더링을 줄여줍니다.      


## 개념
부모에서 이벤트가 일어나면 자식 컴포넌트는 props가 달라지지 않았음에도         
리렌더링 현상이 일어납니다. memo는 불필요한 렌더링을 줄여줍니다.         
         
사용법은 `memo()`로 함수를 감싸주면 끝납니다.         
이렇게 하면 부모에게 전달받은 props가 바뀌지 않는 이상 리렌더링이 되지 않습니다.         
```javascript
const Children = memo(() => {
    return <div></div>
});
```

## 예시
App.js
```jsx
function App() {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div>
      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
      <button onClick={() => setCount(count+1)}>increase count</button>
      <Children count={count}/>
    </div>
  );
}
```
App.js에는 input text와 숫자를 증가시키는 버튼이 있습니다.         
```jsx
const Children = ({count}) => {
    console.log("Render Children")
    return <div>{count}</div>
};
```
자식을 보면 렌더링 될 때마다 `Render Children`이라는 콘솔을 찍습니다.         
여기서 부모 input 값이 변경됨에 따라 state 값이 바뀌고 children은 계속 콘솔을 찍습니다.         

```jsx
const Children = memo(({count}) => {
    console.log("Render Children")
    return <div>{count}</div>
});
```
자식을 `memo()`로 감싸게 되면 props인 count가 바뀌지 않는 이상 렌더링이 되지 않습니다.         



간단하게 memo에 대해 알아보았는데요.        
예시는 간단한 로직이지만 실제 프로젝트에서 계산식이 들어가고 로직이 복잡해지면.        
최적화는 중요해집니다. 사실 저도 최적화에 익숙하지는 않지만 조금씩 연습해 보려고 합니다.        
감사합니다 :)      




---
```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```