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

웹쪽화면은 굳이 React가 아니어도 괜찮습니다.

## 설치
npm으로 webview를 설치합니다.     
```
    npm install react-native-webview
```

## React-Native
RN쪽 코드입니다.       
import 한 WebView 컴포넌트를 return 문안에 사용합니다.       


* `onMessage={}`를 통하여 웹뷰에서 보내는 데이터를 받습니다.     
<br />

* `source={}`는 웹 경로를 적는곳입니다.       
localhost일 경우 자신의 ip를 적습니다.       
ex) http://localhost:3000 -> http://172.28.8.84:3000       


```javascript
    import React from "react";
    import { WebView } from "react-native-webview";

    const WebViewScreen = ({ }) => {


        // 웹뷰에서 데이터를 받을 때 필요한 함수입니다. 
        const handleOnMessage = (e) => {
            console.log(e.nativeEvent.data);
        };


        // RN에서 웹뷰로 데이터를 보낼 때 사용하는 함수입니다. 
        const sendMessage = () => {

            const sendData =JSON.stringify(
                {   
                    type:"cend",
                    id:1,
                    name:"testName",
                    content:"test content",
                    file:null,
                }
            );
            webViewRef.current.postMessage(sendData);
        }

        return (
          <View>
            <WebView
                onMessage={handleOnMessage}
                source={{ uri: " -- 경로 --" }}
            />

            <TouchableOpacity onPress={sendMessage}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        );
    };

    export default WebViewScreen;
```

## React
React 쪽 코드입니다.      
사용하고자 하는 페이지에 requestPermission 함수를 선언합니다.      
useEffect 혹은 원하는 이벤트에서 함수를 실행시키면 됩니다.      

웹뷰로 접속하면 `ReactNativeWebView`객체가 생성된다고 합니다.      
해당 객체를 활용하여 RN에게 데이터를 전달합니다.      

```javascript
    useEffect(() => {
      sendToRN();

      // RN에서 웹으로 데이터를 전송했을때 message이벤트가 실행됩니다.
      document.addEventListener("message", (e) => {
        alert(e.data);
      })
    }, []);
    .
    .
    .
    // 웹뷰에서 RN으로 데이터를 보낼때 사용합니다.
    const sendToRN = () => {
      if (window.ReactNativeWebView) {
        // RN에서 데이터는 반드시 문자열로 받을 수 있기 때문에 
        // JSON.stringify를 사용합니다.
        window.ReactNativeWebView.postMessage(
          JSON.stringify( {data:"hello"} )
        );
      } else {
        // -- 
      }
    };
```


## 추가 정리

위에서 사용한 `onMessage`와 `source`외에 많은 props들이 있습니다.      
<details>
<summary>더 많은 props 보기</summary>

<div markdown="1">

##### source
보여주고자 하는 html 혹은 URI를 넣습니다      
<br />
URI
* uri -> 로드하고자 하는 uri를 넣습니다.
* method -> 원하는 Method를 넣습니다. 안드로이드의 경우 GET과 POST만 지원합니다.
* headers -> 원하는 header를 오브젝트 형식으로 넣습니다.
* body -> body 부분을 넣어야 하고 UTF-8이어야 합니다.
<br />

html

* html -> 로드하고자 하는 html 코드를 문자열로 넣습니다.
* baseUrl -> HTML의 상대 링크에 사용할 기본 URL입니다.


##### automaticallyAdjustContentInsets
콘텐츠 삽입을 조정할지 여부를 제어합니다.              
기본값은 true입니다.                

##### injectJavaScript
웹뷰로 전달되어 즉시 실행시키는 javascript를 문자열로 넣습니다.

##### injectedJavaScript
웹뷰가 로드될 때 javascript를 넣어줍니다.  

##### mediaPlaybackRequiresUserAction
비디오나 오디오가 시작 전 사용자가 탭 해야 하는지를 결정합니다.         
기본값은 true입니다.         

##### nativeConfig
웹뷰를 렌더링 하는데 사용되는 기본 구성 요소를 재정의합니다.         
오브젝트 형식이고 `component`, `props`, `viewManager` 키값을 가지고 있습니다.          

##### onError 
로드를 실패했을 때 호출하는 함수입니다.

##### onLoad 
로드가 완료되면 호출하는 함수입니다.

##### onLoadEnd 
로드가 성공하거나 실패 할 때 호출하는 함수입니다.

##### onLoadStart 
로드를 시작할 때 호출하는 함수입니다.

##### onMessage
웹뷰가 데이터를 보낼 때 호출하는 함수입니다.         
`postMessage`를 활용합니다.         
event.nativeEvent.data의 data는 반드시 문자열이어야 합니다.         

##### onNavigationStateChange
로딩이 시작되거나 끝날 때 호출하는 함수입니다.

##### originWhitelist
탐색을 허용할 목록입니다.
기본값은 `http://*`, `https://*`입니다.

##### renderError
렌더할 때 에러가 나면 호출하는 함수입니다.

##### scrollEnabled
스크롤 가능 여부를 결정합니다.
기본값은 true입니다.

##### javaScriptEnabled
웹뷰에서 javascript를 사용하게 합니다.
기본값은 true입니다.

##### scalesPageToFit
웹 콘텐츠가 view에 맞게 자동적으로 크기조정을 합니다.
기본값은 true입니다.


##### mixedContentMode
보안 출처가 다른 출처에서 콘텐츠를 로드할 수 있도록 합니다.
* never -> 보안 출처가 안전하지 않으면 로드가 안됩니다.
* always -> 모든 콘텐츠를 로드합니다.
* compatibility  -> 최신 웹 브라우저의 접근 방식과 호환되도록 시도합니다.  

이외에도 몇 가지 있으며 위 내용은 [여기](https://reactnative.dev/docs/0.61/webview)에 정리되어 있습니다. 
</div>
</details>

<br />
<br />     

```
  🤔🤔
  개인적으로 공부한것을 정리하는 블로그입니다.
  틀린부분이 있으면 댓글로 알려주시면 감사하겠습니다
```