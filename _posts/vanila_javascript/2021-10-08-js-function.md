---
layout: single
title:  "자주 사용하는 함수 정리"

categories:
  - Vanila Javascript
tags: 
  - [Vanila Javascript, ES6]

date: 2021-10-04
last_modified_at: 2021-10-04
---

안녕하세요!
오늘은 프로젝트를 진행하면서 자주 사용하는 함수들을 설명드리려고 합니다!       

저는 React, RN 프로젝트를 할때는 ES6문법을 자주 사용하고              
순수 js 프로젝트를 할때는 크로스 브라우징때문에 ES6문법을 피하고 있습니다.            

## map()
for반복문 대신 map을 활용하면 간단하게 반복할 수 있습니다.        
React에서는 필수입니다..         

```javascript
["A", "B", "C", "D"].map((item, index) => {
})
```
기본적인 구조는 위와 같습니다. `map()`함수는 배열을 하나씩 돌아줍니다.       
순차적으로 item에는 "A" -> "B" -> "C" -> "D"가 들어가며 index는 해당 순번입니다.

## Concat()
두개의 배열을 합치는 함수입니다.
```javascript
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2); 
console.log(array3) // ["a", "b", "c", "d", "e", "f"]
```

## some()
배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트하여 bool값을 반환합니다.

```javascript
// 비교하고자 하는 배열
const array = [1, 2, 3, 4, 5];

// 판별 함수 (조건을 적는다.)
const even = item => item == 2;

console.log(array.some(even)); //true

// array.some(item => item == 2) 
// 이런식으로 한줄로 사용 가능합니다.
```

## filter()
조건에 해당하는 배열 요소만 반환합니다.

```javascript
// 비교하고자 하는 배열
const array = [1, 2, 3, 4, 5];

// 판별 함수 (조건을 적는다.)
const even = item => item < 3;

console.log(array.filter(even)); // [1, 2]

// array.some(item => item < 3) 
// 이런식으로 한줄로 사용 가능합니다.
```

<br />
```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```