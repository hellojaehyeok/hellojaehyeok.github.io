---
layout: single
title:  "React Native Realm"
excerpt : "Datebase인 Realm 활용법"

categories:
  - React Native 
tags: 
  - [React Native, Realm, Database]

date: 2021-09-23
last_modified_at: 2021-09-23
---



# Realm
![image](https://user-images.githubusercontent.com/62782245/134514066-7ca40a5d-e3df-4c82-bfa2-75f405ff4aec.png){: .align-center width="50%"}
<br />
<br />
안녕하세요! 오늘은 Realm에 대하여 작성하려고 합니다.     
Realm은 쉽게 생각하여 모바일 데이터베이스라고 생각하시면 됩니다.     
싱글톤과 다른 점은 앱을 종료하여도 데이터가 남아있다는 점입니다.      
이를 활용하여 자동 로그인이나 실제 DB에 넣기 애매한 휘발성이 강한 데이터를 넣습니다.        



## 기본 함수

Realm.open 선언한 스키마에 접근합니다.
```javascript
    var realm = await Realm.open({ --- });
```


## 설치 
npm으로 realm을 설치해줍니다.
```
    npm install --save realm
```


## Realm 활용
database폴더를 따로 만들고 realm을 위한 파일을 만들어줍니다.    

아래 예제는 최근 검색한 주소를 불러오고 삭제하고 추가하는 코드입니다.

배열형태로 저장하려하였지만 불가능하여 스트링형식으로 담고     
join과 split함수를 활용하여 배열로 다시 바꿔 사용하였습니다.     


주석으로 추가설명 이어가겠습니다.     

```javascript
    import Realm from "realm";

    // 데이터베이스에 저장할 이름과 초기값을 정해줍니다.
    const LatelyAddress ={
        name: 'LatelyAddress',
        properties: {
            addressArr : "string",
        }

    }

    // LatelyAddress(스키마)가 바뀔때마다 스키마버전을 1씩 올려줍니다.
    const schemaVersion = 1;

    // 최근 주소 가져오는 함수입니다.
    const getLatelyAddressFromRealm = async (setLatelyAdd) =>{
        // Realm.open으로 스키마 버전과 스키마 이름이 동일한 객체에 접근합니다.
        var realm = await Realm.open({schemaVersion:schemaVersion,schema: [LatelyAddress]});
        // 저장된 데이터를 보기 위하여 objects로 LatelyAddress를 검색하여 JSON 객체로 반환합니다.
        var filter = await realm.objects('LatelyAddress');

        // 저는 string 형식으로 저장했기 때문에 split 함수로 배열로 만들어 줍니다.
        filter = filter[0].addressArr.split("-");

        // useState로 변수를 담습니다.
        setLatelyAdd(filter);
        return;
    }

    // 주소를 더하는 함수입니다. 
    const addLatelyAddress = async (data) => {
        var realm = await Realm.open({schemaVersion:schemaVersion,schema: [LatelyAddress]});
        var filter = await realm.objects('LatelyAddress');
        
        // 맨 처음 저장된 값이 없을 경우 그냥 넣어줍니다.
        if(filter.length==0){
            filter = JSON.stringify(data);
        }
        else{
            // 저장된 값이 있을 경우 JSON.parse(JSON.stringify())를 통하여
            // 편집 가능한 변수로 만들어줍니다.
            filter = JSON.parse(JSON.stringify(filter[0].addressArr)); 
            // string 형식을 배열로 만들고 푸시 한 뒤 다시 묶어 줍니다.
            filter = filter.split("-");
            filter.push(JSON.stringify(data));
            filter = filter.join("-");
        }
        
        // write 함수안에서 데이터를 편집합니다.
        await realm.write(() => {
            // try, catch를 이용하여 에러핸들링을 합니다.
            try{ 
                // deleteAll은 데이터를 모두 지워줍니다.
                realm.deleteAll();
                // create를 이용하여 새로운 데이터를 추가해줍니다.
                let createRealm = realm.create('LatelyAddress', {
                    addressArr:filter
                });
            }catch(e){console.log(e);}
        })
    }

    // 주소를 삭제하는 함수입니다.
    // 방식은 더하는 함수와 비슷하며 해당 incex를 가져와 삭제한 후 
    // 다시 db에 넣어주는 형식입니다.
    const removeLatelyAddress = async (index) => {

        var realm = await Realm.open({schemaVersion:schemaVersion,schema: [LatelyAddress]});
        var filter = await realm.objects('LatelyAddress');

        filter = JSON.parse(JSON.stringify(filter[0].addressArr)); 
        filter = filter.split("-");
        filter.splice(index, 1);
        filter = filter.join("-");
        
        await realm.write(() => {
            try{ 
                realm.deleteAll();
                let createRealm = realm.create('LatelyAddress', {
                    addressArr:filter
                });
            }catch(e){console.log(e);}
        })
    }

    // 위 세개의 함수들을 export합니다.
    export default {
        getLatelyAddressFromRealm ,
        addLatelyAddress ,
        removeLatelyAddress ,
    };
```   

### 추가 정리
---
상단에 초기값을 정리할때 넣을 수 있는 속성들 입니다.
* bool 속성은 JavaScript의 Boolean 객체에 매핑됩니다.
* int, float, double 속성은 JavaScript의 Number 객체에 매핑됩니다. 내부적으로 ‘int’와 ‘double’은 64 비트로, float은 32 비트로 저장됩니다.
* string 속성은 String으로 매핑됩니다.
* data 속성은 ArrayBuffer로 매핑됩니다.
* date 속성은 Date로 매핑됩니다.

추후 알게된 내용이지만 속성을 list로 하게되면 리스트 속성에 접근할 때 list객체가 반환된다고 한다.
가장 큰 차이점은 List의 변경 사항이 자동으로 기본 Realm에 유지된다는 점이라고 하는데
나중에 기회가 된다면 이것도 사용해봐야겠다.

조금 더 자세히 알고싶다면 [여기](https://docs.mongodb.com/realm-legacy/kr/docs/javascript/latest.html)랑 [여기](https://ichi.pro/ko/realm-for-react-native-sijaghagi-212611396888408)를 참고해주세요!