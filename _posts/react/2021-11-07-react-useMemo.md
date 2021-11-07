---
layout: single
title:  "React 최적화 useMemeo"

categories:
  - React
tags: 
  - [React]

date: 2021-11-07

---

안녕하세요!             
React 최적화 방법 중 하나인 useMemo에 대하여 알아볼 겁니다.          
사실 useMemo를 굳이 사용하지 않아도 웹은 잘 돌아갑니다.          
하지만 프론트엔드 개발자라면 렌더링 성능 최적화에는 관심이 있어야 하고           
조금이라도 더 나은 사용자 경험을 줄 수 있어야 한다고 생각합니다.          
          
          
본격적으로 들어가기에 앞서 개념 하나만 정리하겠습니다.          
react-hook은 jsx를 반환하기 위한 함수입니다.          
즉 리턴문을 불러오기 위하여 함수안에 있는 모든 변수, 함수를 매번 다시 선언합니다.          
          
useMemo는 이러한 불필요한 렌더링을 줄여줍니다.           

## 개념
[공식문서입니다!](https://reactjs.org/docs/hooks-reference.html#usememo)          
          
`useEffect`와 마찬가지로 두 개의 인자를 받습니다.          
간단하게 말해서 두 번째 배열의 값이 바뀔 때마다 첫 번째 인자 값이 실행됩니다.          

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```


## 예시
App.js
```jsx
function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  return (
    <div>
      <button onClick={() => setA(a+1)}>a {a}</button>
      <button onClick={() => setB(b+1)}>b {b}</button>
      <button onClick={() => setC(c+1)}>c {c}</button>
      <Children a={a} b={b} c={c} />
    </div>
  );
}
```
App.js에 a, b, c 라는 int가 있고 버튼을 클릭할 때마다 증가하게 만들어 봤습니다.       
`Children`이라는 자식 컴포넌트에다가 각각 넘겨줍니다.     

Children.js
```jsx
const plusAB = (a, b) => {
    console.time("forLoop");
    let count = 0;
    for(let i=0;i<2000000000;i++){count++;}
    console.timeEnd("forLoop");
    return a + b;
}
const Children = ({a, b, c}) => {
    const ab = plusAB(a, b);

    return(<div>{ab}</div>)
};

```
Children.js에는 plusAB라는 20억 번의 반복문과 a, b를 더하고 리턴해주는 함수가 있습니다.       
제 컴퓨터에서 이 반복문은 평균 924ms가 걸립니다.       
a와 b 값이 변경되는 경우라면 당연히 이 연산이 필요한것이 맞지만 c의 경우에는 다릅니다.       
전혀 다른 변수인 c를 증가시키는데 0.9초라는 시간이 걸린다면 이는 문제가 있습니다.       
       
코드를 이렇게 바꿔보면 어떨까요       
```jsx
const plusAB = (a, b) => {
    console.time("forLoop");
    let count = 0;
    for(let i=0;i<2000000000;i++){count++;}
    console.timeEnd("forLoop");
    return a + b;
}
const Children = ({a, b, c}) => {
    const ab = useMemo(() => plusAB(a, b), [a, b]);
    // const ab = plusAB(a, b);

    return(<div>{ab}</div>)
};
```
useMemo를 사용하여 a, b 값이 바뀔 때만 plusAB 함수를 실행합니다.       
이제 0.9를 기다릴 필요 없이 c 값을 변경할 수 있습니다.       



---
```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```