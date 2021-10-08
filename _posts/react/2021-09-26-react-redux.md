---
layout: single
title:  "React Redux 기초 및 사용법"
excerpt : "React Redux 기초 및 사용법"

categories:
  - React
tags: 
  - [React, Redux]

date: 2021-09-26
last_modified_at: 2021-09-26

---

React-Redux 기초 세팅 및 사용방법입니다.       
redux는 전역에서 사용 가능한 변수 저장소라고 생각하면 이해하기 편합니다.       
react에서 정보를 전달할 때는 props를 이용하여 부모, 자식 간 이동을 해야 하는데       
규모가 방대해지면 코드를 관리하기 어렵워집니다.     
redux는 따로 정보를 넘길 필요 없이 redux에 저장된 변수를 변경하면        
사용하고 있는 파일은 자동적으로 렌더링 됩니다.         

---
✋✋     
본 글에서 redux를 깊게 파고 들어가지 않습니다.        
단순히 상태 값을 관리하기 위하여 사용하였기 때문에       
굳이 이해를 무조건 해야 할 필요는 없습니다.         
아래 소스코드들은 [여기](https://github.com/hellojaehyeok/React_Redux)에서 직접 받아보실 수 있습니다.


## Redux 설치

설치       

    npm install react-redux
    npm install redux-actions   


오류가 나면 아래 코드를 package.json에 작성 후 npm install 합니다.      

    "react-redux": "7.2.3",
    "redux-actions": "^2.6.5",


## index.js 기초 세팅
react-redux와 store를 import합니다.       
`<Provider store={store}>...</Provider>` 로 감싸줍니다.        

index.js        
```javascript
    import { Provider } from 'react-redux';
    import store from './store';
    .
    .
    .
    <Provider store={store}>
        <React.StrictMode>
        <App />
        </React.StrictMode>
    </Provider>
```

## Store 파일 관리

store 폴더를 따로 만들어 파일을 관리합니다.      
기본적으로 필요한 파일은 4개입니다.       
1. ./store/index.js   -> default
2. ./store/configure.js  -> default
3. ./store/actionCreators.js  ->  제작한 redux파일을 모아 export합니다.
4. ./store/modules/index.js   ->  제작한 redux파일을 모아 export합니다.

이후 원하는 redux 파일을 생성합니다.        
1. fruitData.js 


아래 사진처럼 세팅하시면 됩니다.     
![image](https://user-images.githubusercontent.com/62782245/134791455-25108032-4b86-4283-999a-c8499ab5c57d.png)

## Redux 생성
직접적으로 사용할 js 입니다.       
쉽게 생각하여 1번, 2번, 4번은 set // 3번은 get 이라고 생각하면 좋습니다.       
3번에는 변수의 default 값을 설정합니다.     


fruitData.js         

```javascript
    import { createAction, handleActions } from 'redux-actions';
    import produce from 'immer';

    // 액션 타입을 정의해줍니다.
    // -------------------------------  1번
    const UPDATE_FRUIT = 'uesr/fruit';
    const UPDATE_STRAWBERRY = 'uesr/strawberry';
    const UPDATE_RESET = 'uesr/reset';
 
    // 액션 생성 함수를 만듭니다.
    // -------------------------------  2번
    export const updateFruit = createAction(UPDATE_FRUIT);
    export const updateStrawberry = createAction(UPDATE_STRAWBERRY);
    export const updateReset = createAction(UPDATE_RESET);

    // 모듈의 초기 상태를 정의합니다.  
    // -------------------------------  3번
    const initialState = {
    fruit:{
        apple:0,
        banana:0,
    },
    strawberry:{count: 0},
    }

    // immer를 사용하여 값을 수정하는 리듀서입니다.
    // -------------------------------  4번
    export default handleActions({
    [UPDATE_FRUIT]: (state, action) => {
        return produce(state, draft => {
            draft.fruit = action.payload.fruit ? action.payload.fruit : draft.fruit;
        });
    },
    [UPDATE_STRAWBERRY]: (state, action) => {
        return produce(state, draft => {
            draft.strawberry = action.payload.strawberry ? action.payload.strawberry : draft.strawberry;
        });
    },
    [UPDATE_RESET]: (state, action) => {
        return produce(state, draft => {
            draft.fruit = action.payload.fruit ? action.payload.fruit : draft.fruit;
            draft.strawberry = action.payload.strawberry ? action.payload.strawberry : draft.strawberry;
        });
    },
    }, initialState);
```

    
## Redux 활용

useSelector를 사용하여 저장한 데이터에 접근합니다.      
useSelector로 받아온 데이터가 수정이 불가능할 경우       
JSON.parse(JSON.stringify( -data- )) 를 사용하여 변수를 따로 만든 후 수정합니다.       

```javascript
    const fruitRedux = JSON.parse(JSON.stringify(fruitData.fruit));
```

위 코드에서 데이터를 찾지 못하거나 변경이 안 되는 것 같다 싶으면 redux 코드를 다시       
확인하시고 storeData를 콘솔에 찍어 제대로 접근하고 있는지 확인하면 됩니다.            

```javascript
    const storeData = useSelector(store=>{ return store});
```


나머지 설명은 주석으로 하겠습니다.         

app.js
```javascript
    import logo from './logo.svg';
    import './App.css';

    // Redux
    import { FruitDataAction } from './store/actionCreators';  // 정보를 수정할 때 사용합니다.
    import { useSelector } from 'react-redux'; // 정보를 가져올 때 사용합니다.

    // Redux
    import resetFruit from './resetFruit'; 

    function App() {
        const fruitData = useSelector(store=>{ return store.fruitData}); // useSelector를 이용하여 store.fruitData에 접근합니다.
        const fruitRedux = JSON.parse(JSON.stringify(fruitData.fruit)); // fruitData안에있는 fruit에 접근합니다.
        const strawberryRedux = JSON.parse(JSON.stringify(fruitData.strawberry));; // fruitData안에있는 strawberry에 접근합니다.

        // 버튼 컴포넌트
        const btnComponent = (name) => {
            return(
            <div>
                <button className="plus" onClick={() => onClickPlus(name)}> + </button>
                <button className="minus" onClick={() => onClickMinus(name)}> - </button>
            </div>
            )
        }
        // + 버튼 클릭
        const onClickPlus = (name) => {
            if(name == "strawberry"){
            strawberryRedux.count += 1; // 가져온 데이터를 수정합니다.
            FruitDataAction.updateStrawberry({strawberry:strawberryRedux}); // 수정한 데이터를 적용합니다.
            return;
            }

            if(name == "apple"){
            fruitRedux.apple += 1;
            }else if(name == "banana"){
            fruitRedux.banana += 1;
            }
            FruitDataAction.updateFruit({fruit:fruitRedux});
        }
        // - 버튼 클릭
        const onClickMinus = (name) => {
            if(name == "strawberry"){
            strawberryRedux.count -= 1;
            FruitDataAction.updateStrawberry({strawberry:strawberryRedux});
            return;
            }

            if(name == "apple"){
            fruitRedux.apple -= 1;
            }else if(name == "banana"){
            fruitRedux.banana -= 1;
            }
            FruitDataAction.updateFruit({fruit:fruitRedux});
        }
        // 초기화 버튼 클릭
        const onClickReset = () => {
            // 외부에서 가져온 초기redux(resetFruit)을 넣어 초기화합니다. 
            FruitDataAction.updateReset(resetFruit);
        }

        return (
            <div className="App">
            <h1>React - Redux</h1>
            <div className="listContainer">
                <ul className="listWrap">
                <li>
                    사과 : {fruitRedux.apple} {btnComponent("apple")}
                </li>
                <li>
                    바나나 : {fruitRedux.banana} {btnComponent("banana")}
                </li>
                <li>
                    딸기 : {strawberryRedux.count} {btnComponent("strawberry")}
                </li>
                </ul>
                <button onClick={() => onClickReset()} className="reset">초기화</button>
            </div>
            </div>
        );
    }
    export default App;
```

## Redux 초기화 (응용)
redux에 있는 데이터를 초기화하는 여러 가지 방법 중 하나입니다.        
js 파일을 따로 만들어 export 합니다.        

resetFruit.js

```javascript
    // 초기화 기능을 위하여 초기 redux 값을 넣습니다.
    export default {
        fruit:{
            apple:0,
            banana:0,
        },
        strawberry:{count: 0},
    }
```
그 후 FruitDataAction을 이용하여 초기화시켜 줍니다.        
updateReset은 각각의 변수에 접근하여 초깃값으로 돌려줍니다.        

```javascript
    FruitDataAction.updateReset(resetFruit);
```    

---
```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```