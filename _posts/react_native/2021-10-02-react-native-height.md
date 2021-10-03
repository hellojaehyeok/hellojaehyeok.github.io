---
layout: single
title:  "React Native 무한스크롤, 역무한스크롤"
excerpt : "RN 무한스크롤, 역무한스크롤을 구해보자!"

categories:
  - React Native 
tags: 
  - [React Native, Scroll]

date: 2021-10-03
last_modified_at: 2021-10-03
---


안녕하세요!    
오늘은 RN의 무한 스크롤, 역무한스크롤에 대해 적어보려고 합니다.      
      
무한 스크롤은 주로 상품이나 게시판 같은 리스트들을 나열할 때 사용합니다.       
위에서 아래로 가는 형식입니다.       

역무한스크롤은 채팅방 같은 것들을 구현할 때 사용합니다.       
아래에서 위로 가는 형식입니다.       



## 기본 무한 스크롤
먼저 사용하고자하는 `ScrollView`에다가 onScroll 이벤트를 넣어줍니다.

```javascript
<ScrollView 
  onScroll={onScrollFunc}
>
```

e.nativeEvent에 접근하여 사용하고자 하는 값들을 구해줍니다.

```javascript

const [isUpdateList, setIsUpdateList] = useState(true); 
.
.
.
const onScrollFunc = (e) => {
  // 현재 보여지는 화면 높이 값
  let screenHeight = e.nativeEvent.layoutMeasurement.height;
  // 현재 스크롤 값
  let updateScroll = e.nativeEvent.contentOffset.y;
  // 전체 문서의 높이
  let documentHeight = e.nativeEvent.contentSize.height;
  // 무한 스크롤이 시작하는 최소의 여백
  let paddingtoBottom = 100;
  
  // 현재 스크롤 값이 0이면 실행시키지 않습니다.
  if(updateScroll == 0){return}

  // paddingtoBottom을 더하는 이유는 굳이 사용자가 끝까지 내리지 않고
  // 조금의 여유를 두어 사용자 경험을 더하기 위해서입니다.
  if (screenHeight + updateScroll + paddingtoBottom >= documentHeight) {

    if(!isUpdateList){return};
  
    // 이곳에 무한 스크롤을 이용하여 사용하고자 하는 함수를 추가합니다.
    // ----- 

    setIsUpdateList(false)
    setTimeout(() => {
      setIsUpdateList(true)
    }, 2000);

  }
}
```
       
위 코드에서 `isUpdateList`를 활용한 이유는 paddingtoBottom을 이용했기 때문입니다.       
여유를 준 만큼 `screenHeight + updateScroll + paddingtoBottom >= documentHeight` 식이       
계속 true 값을 반환하여 서버 통신이 계속 일어납니다.       
서버 통신을 단 한번만 하기 위하여 isUpdateList 조건문을 추가하였고       
조건문 안에서 상태를 false로 만들어 더 이상 조건문이 실행되지 않도록 하였습니다.        
setTimeout 2초 후 다시 true 값을 만들어 다음번 서버 통신 이벤트를 가능하게 만들어줍니다.       




## 역 무한 스크롤
역무한스크롤은 신경써야할게 조금 더 많습니다.

기본 무한 스크롤과 동일하게 onScroll이벤트를 넣고 추가로 ref까지 넣어줍니다.      
View로 한번 더 안에 들어갈 내용들을 감싸줍니다.      

```javascript
<ScrollView
    onScroll={onScrollChat}
    ref={chatScrollRef}
>
  <View ref={chatContentRef}>
  .
  .
  .
  </View>
</ScrollView>
```

역무한스크롤같은 경우 스크롤이 위가 아닌 맨 아래로 가야합니다.          
`useFocusEffect`안에서 scrollToEnd를 써서 끝으로 가게 합니다.          
setTimeout을 사용한 이유는 모든게 렌더된 후에 아래로 내리고 싶었기 때문입니다.          
          
```javascript
useFocusEffect(useCallback(() => {
    setTimeout(() => {
        chatScrollRef.current.scrollToEnd({animated: false});
    }, 0)   
}, []))
```

스크롤이 될때 일어나는 함수입니다.

```javascript
const onScrollChat = e => {
    if(isFirstRender){
        setTimeout(() => {
            setIsFirstRender(false);
        }, 500)
        return;
    }

    // 현재 보여지는 화면 높이 값
    let screenHeight = e.nativeEvent.layoutMeasurement.height;
    // 현재 스크롤 값
    let updateScroll = e.nativeEvent.contentOffset.y;
    // 전체 문서의 높이
    let documentHeight = e.nativeEvent.contentSize.height;


    if(updateScroll == 0){
        const addData = chatArr.concat( -- 서버통신하여 받아온 배열 -- );
        setChatArr([...addData]);     

        setTimeout(() => {
            chatContentRef.current.measureLayout(ReactNative.findNodeHandle(chatScrollRef.current), (xPos, yPos, _width, _height) => {
                chatScrollRef.current.scrollTo({x:0, y:_height - documentHeight, animated: false});
            })
        }, 100);
    }
}
```

isFirstRender 조건문을 사용한 이유는 useFocusEffect 안에서 사용한 scrollToEnd 이벤트가          
일어났을 때에는 이벤트를 실행시키지 않기 위해서입니다.          
          
기본 무한 스크롤과는 반대로 제일 아래로 갔을 때 서버 통신을 하는 게 아닌          
제일 위로 갔을 때 실행시키는 것이기 때문에 updateScroll이 0이 되었을 때 이벤트를 실행합니다.          

서버 통신하여 받아온 배열 데이터를 concat 함수로 합쳐줍니다.          
배열이 늘어난 후에도 스크롤 값은 0으로 동일하기 때문에 이 시점에서 마지막          
스크롤 값을 기억하여 그 위치로 이동해 주어야 합니다.          
          

아래의 measureLayout, findNodeHandle를 활용해서 바뀐 데이터들의 전체 높이를 가져옵니다.          
scrollTo를 써서 스크롤 값을 바꿔줍니다.          

          
`_height - documentHeight`이 공식이 역무한스크롤의 핵심입니다.          
해석해보면     
"콘텐츠 사이즈가 바뀐 후 전체 높이 값" - "콘텐츠 사이즈가 바뀌기 전 전체 높이 값" 입니다.          
이 공식은 결국 콘텐츠가 바뀐 후 스크롤 값이 늘어나도 제자리에 있는 것처럼 보이게 됩니다.          

```javascript
chatContentRef.current.measureLayout(ReactNative.findNodeHandle(chatScrollRef.current), (xPos, yPos, _width, _height) => {
    chatScrollRef.current.scrollTo({x:0, y:_height - documentHeight, animated: false});
})
```

onContentSizeChange로 스크롤안의 사이즈를 감지하여 스크롤값을 바꿔줘도 괜찮습니다!

<br />

이 글은 추후 업데이트될 예정입니다 :)

<br />


```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```