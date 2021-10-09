---
layout: single
title:  "formData 사용시 Json parse error:Unexpeced ... 에러 해결"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript, ES6]

date: 2021-10-10
last_modified_at: 2021-10-10
---

안녕하세요!
api 서버통신을 하다 보면 formData를 활용해서 서버에 데이터를 넘기는데요.         
아래와 같은 에러가 뜰 때가 있습니다.          

![image](https://user-images.githubusercontent.com/62782245/136663797-74ff3af8-c472-41b9-b4b5-c7e2daf49580.png)

## 해결법
이럴 때는 formData 대신 raw 형식을 사용해야 합니다.         
```javascript
var formData = new FormData();
formData.append("email", "iamEmail@email.com");
formData.append("name", "mynameisname");
```
원래는 이러한 형식으로 보냈다면 이제는         
```javascript
var raw = JSON.stringify({
  "email": "iamEmail@email.com",
  "name": "mynameisname",
});
```
이런 식으로 보내면 됩니다. :)         

<br />
```
    🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```