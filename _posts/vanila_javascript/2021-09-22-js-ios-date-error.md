---
layout: single
title:  "IOS Date Error "
excerpt : "IOS에서 날짜가 NaN으로 나타나는 에러"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript, ios]

date: 2021-09-22
last_modified_at: 2021-09-22
---

프론트엔드 개발을 하다 보면 윈도우에서 잘 나오는 날짜가        
ios로 넘어갈 경우 NaN으로 나오는 에러가 있습니다.        
        
날짜를 렌더링 하는 방식이 달라 나오는 에러로        
해결하기 위해서는 replace()를 사용해야 합니다.        

```javascript 
  new Date(----.replace(/-/g, "/"))
```