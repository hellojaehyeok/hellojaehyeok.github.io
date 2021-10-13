---
layout: single
title:  "[React Native] Singleton 싱글톤 정리"
excerpt : "React Native Singleton 정리"

categories:
  - React Native 
tags: 
  - [React Native, Singleton]

date: 2021-09-21
last_modified_at: 2021-09-22
---



# Singleton
유니티 C#하면서 사용했었는데 RN에서도 사용할줄 몰랐다.     
react에 redux가 있다면 RN에는 singleton이 있다.       
      
<br />
아래 코드들은 주소저장 싱글톤 예제입니다.    

## 선언
먼저 addressSingleton.js를 만들고 아래와 같이 코드를 넣어줍니다.

```javascript
    export default class AddressSingleton {

    static myInstance = null;

    // 사용할 변수를 선언합니다.
    _area = "";

    // getInstance를 활용해서 기존 값이 없으면 새로운 값을 넣고 있으면 그 값을 반환합니다.
    static getInstance() {
        if (AddressSingleton.myInstance == null) {
            AddressSingleton.myInstance = new AddressSingleton();
        }
        
        return this.myInstance;
    }

    // 사용할 함수를 선언합니다.
    returnArea (){
        return this._area
    }
```

<br />

## 활용
위에서 선언한 싱글톤을 활용하기 위해서는 import하여 사용하면 됩니다. 
```javascript
    import addressSingleton from './addressSingleton';
    .
    .
    .
    // addressSingleton의 getInstance()를 활용하여 변수에 접근합니다.
    console.log(addressSingleton.getInstance()._area)
```

