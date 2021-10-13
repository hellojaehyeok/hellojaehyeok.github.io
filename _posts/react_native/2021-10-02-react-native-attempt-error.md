---
layout: single
title:  "[React Native] Attempt to invoke virtual method..."

categories:
  - React Native 
tags: 
  - [React Native, Error]

date: 2021-10-14
last_modified_at: 2021-10-14
---

안녕하세요!
RN 프로젝트를 하다 보면 아래와 같은 에러가 뜰 때가 있습니다.

![l_99203353_58_1634111271556](https://user-images.githubusercontent.com/62782245/137162303-91fd9e67-4016-4dee-ab40-b08566bf7a37.png)


정확한 원인은 모르겠지만 캐시를 지우면 해결됩니다. :)
```
npm start --reset-cache
```
그 후 다시 빌드 해서 진행하시면 됩니다!

[여기](https://github.com/react-native-maps/react-native-maps/issues/2924)서 참고하였습니다.



```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```