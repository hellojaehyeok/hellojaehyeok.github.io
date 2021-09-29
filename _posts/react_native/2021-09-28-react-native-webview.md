---
layout: single
title:  "React Native Webview"
excerpt : "React Native Webview 사용법"

categories:
  - React Native 
tags: 
  - [React Native, React, Webview]

date: 2021-09-28
last_modified_at: 2021-09-28
---


안녕하세요!    
오늘은 웹뷰에 대해 적어보려고 합니다.           
웹뷰란 앱에서 웹 화면을 띄우는 것을 말합니다.      

RN 특성상 React보다 한계가 많기 때문에 앱 개발을 하다 보면 종종 사용합니다.      
또한 웹앱을 만들 때에도 사용합니다.      

웹뷰를 사용하기 위해서는 기본적인 RN과 React에 대한 지식이 필요합니다.

## 설치
npm으로 webview를 설치합니다.     
```
    npm install react-native-webview
```

## 웹뷰화면 띄우기 & 웹뷰->RN으로 데이터 전송
### React-Native
RN 쪽 코드입니다.       
import 한 WebView 컴포넌트를 return 문안에 사용합니다.       


* `onMessage={handleOnMessage}`를 통하여 웹뷰에서 보내는 데이터를 받습니다.     
<br />

* `source={{ uri: -- 경로 -- }}`는 웹 경로를 적는곳입니다.       
localhost일 경우 자신의 ip를 적습니다.       
ex) http://localhost:3000 -> http://172.28.8.84:3000       


```javascript
    import React from "react";
    import { WebView } from "react-native-webview";

    const WebViewScreen = ({ }) => {


        /** 웹뷰에서 RN으로 값을 보낼때 거치는 함수입니다. */
        const handleOnMessage = ({ nativeEvent: { data } }) => {
            console.log(data);
        };


        return (
            <WebView
                onMessage={handleOnMessage}
                source={{ uri:" -- 경로 --" }}
            />
        );
    };

    export default WebViewScreen;
```

### React
React 쪽 코드입니다.      
사용하고자 하는 페이지에 requestPermission 함수를 선언합니다.      
useEffect 혹은 원하는 이벤트에서 함수를 실행시키면 됩니다.      

모바일에서 웹을 접속하면 `ReactNativeWebView`객체가 생성된다고 합니다.      
해당 객체를 활용하여 RN에게 데이터를 전달합니다.      

```javascript
    useEffect(() => {
      requestPermission();
    }, []);
    .
    .
    .
    // 웹뷰에서 RN으로 보낼때 사용한다. ------------
    const requestPermission = () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({data:"hello2"})
        );
      } else {
        console.log("모바일아님");
      }
    };
```



```
    🤔🤔
    개인적으로 공부한것을 정리하는 블로그입니다.
    틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```