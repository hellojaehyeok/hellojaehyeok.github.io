---
layout: single
title:  "숫자를 한글로 표현하기"
excerpt : "숫자를 한글로 표현"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript]

date: 2021-10-03
last_modified_at: 2021-10-03
---

숫자를 한글로 표현해 주는 함수입니다.

```javascript
function numTokor(num) {
    num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + '';
    if(num == '0')
    return '영';
    var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    var unit = ['', '만', '억', '조'];
    var smallUnit = ['천', '백', '십', ''];
    var result = [];
    var unitCnt = Math.ceil(num.length / 4);
    num = num.padStart(unitCnt * 4, '0') 
    var regexp = /[\w\W]{4}/g;
    var array = num.match(regexp);
    for(var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
    var hanValue = _makeHan(array[i]); 
    if(hanValue == '') 
    continue;
    result.unshift(hanValue + unit[unitCnt]);
    }
    function _makeHan(text) {
    var str = '';
    for(var i = 0; i < text.length; i++) {
    var num = text[i];
    if(num == '0') //0은 읽지 않는다
    continue;
    str += number[num] + smallUnit[i];
    }
    return str;
    }
    return result.join('');
}

console.log(numTokor(100000)); // 일십만
```


<br />
```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```