---
layout: single
title:  "React Native Singleton"
excerpt : "React Native Singleton"

categories:
  - React Native 
tags: 
  - [React Native, Singleton]

date: 2021-09-21
last_modified_at: 2021-09-21
---



# Singleton
유니티 C#하면서 사용했었는데 RN에서도 사용할줄 몰랐다.
react에 redux가 있다면 RN에는 singleton이 있다.       
      

선언

    export default class AddressSingleton {

    static myInstance = null;

    // 사용할 변수를 선언한다.
    _area = "";

    // getInstance를 활용해서 기존 값이 없으면 새로운 값을 넣고 있으면 그 값을 반환한다.
    static getInstance() {
        if (AddressSingleton.myInstance == null) {
            AddressSingleton.myInstance = new AddressSingleton();
        }
     
        return this.myInstance;
    }

    // 사용할 함수를 선언한다.
    returnArea (){
        return this._area
    }

활용

    // 접근한다.
    import addressSingleton from '../../db/addressSingleton';
    .
    .
    .
    // getInstance()를 활용해주어야한다.
    console.log(addressSingleton.getInstance()._area)
