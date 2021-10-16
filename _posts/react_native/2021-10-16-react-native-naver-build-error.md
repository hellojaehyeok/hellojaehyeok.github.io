---
layout: single
title:  "[React Native Error] naver-login:verifyReleaseResource"

categories:
  - React Native 
tags: 
  - [React Native, Error]

date: 2021-10-16
last_modified_at: 2021-10-16
---


안녕하세요!          
오늘은 RN 빌드 시 네이버 로그인 관련 에러를 다루겠습니다.


![l_99203353_68_1634261449982](https://user-images.githubusercontent.com/62782245/137498906-194960af-0efd-4850-b6e2-6e9eacdbe528.png)


react-native-seoul-naver-login: "verifyReleaseResources"         
네아로(네이버 아이디 로그인) sdk 버전 때문에 나타나는 에러입니다.        
구글링 해본 결과 아래 경로에 있는 버전을 높여줍니다.        
`/node_modules/@react-native-seoul/naver-login/android/build.gradle`
        
```
def DEFAULT_COMPILE_SDK_VERSION = 28 // 저는 기존에 27이었습니다. 
def DEFAULT_BUILD_TOOLS_VERSION = "29.0.3"
def DEFAULT_MIN_SDK_VERSION = 16
def DEFAULT_TARGET_SDK_VERSION = 28
```

이렇게 했는데도 저는 `generateReleaserfile`라는 새로운 오류가 나왔습니다.          
이거는 구글링해도 안나오더라고요..          
sdk 버전 이슈인 것 같아 네아로버전을 건드려봤지만 동일한 에러가 나왔고           
저는 `android/build.gradle`의 빌드 버전을 `30.0.3`에서 `29.0.3`으로 내렸더니 해결되었습니다.          
          
에러내용           
`react-native-seoul-naver-login: "generateReleaserfile"`
          
```
buildscript {
    ext {
        buildToolsVersion = "29.0.3" // 이 부분입니다!
        minSdkVersion = 17
        compileSdkVersion = 29
        targetSdkVersion = 29
    }
    ...
```
      



```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```