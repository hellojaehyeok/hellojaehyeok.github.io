---
layout: single
title:  "[React Native] 이미지 서버에 보내기"

categories:
  - React Native 
tags: 
  - [React Native]

date: 2021-10-15
last_modified_at: 2021-10-15
---


안녕하세요!          
오늘은 이미지 파일을 서버에 올리는 법입니다!      
      
먼저 기기안에서 이미지를 가져오기 위해 라이브러리를 사용합니다.      

[npm 사이트입니다!](https://www.npmjs.com/package/react-native-image-crop-picker)


방법은 정말 간단합니다.      
`ImagePicker`로 가져온 이미지 데이터를 아래 obj 형태로 만들어 그대로 서버에 넘기면 끝입니다!! :)      

```javascript
import ImagePicker from 'react-native-image-crop-picker';

ImagePicker.openPicker({ multiple: false ,mediaType:'photo', compressImageQuality : 0.6}).then(images => {
  let obj = {
      uri: images.path,
      type: images.mime,
      name: `${images.modificationDate}${images.path.slice(-4)}`,
  };
}); 
```


```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```