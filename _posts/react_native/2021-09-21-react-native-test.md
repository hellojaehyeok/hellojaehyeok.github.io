---
layout: single
title:  "React Native Test Nav"
excerpt : "React Native 기초정리"

categories:
  - React Native
tags: 
  - [React Native]

date: 2021-09-21
last_modified_at: 2021-09-21

---

# React Native
React Native 기초 정리입니다.


## Component
HTML 태그를 사용하지 못하고 RN은 UI 구현을 위한 기본 컴포넌트를 제공한다.

### View
div 같은 역할을 한다. (구역을 나눌 때 사용한다.)

### Text 
p 같은 역할을 한다. 텍스트를 입력 시 Text 안에 넣어 사용한다.
Text가 아닌 다른 태그를 이용하여 텍스트를 넣으면 오류가 난다.

### Image
img 를 넣을 시 사용한다.
경로는 아래 코드와 같이 지정한다.

```javascript
  // 상대경로
  source={require('../img/logo.png')}
  // 절대경로
  source={{uri: `이미지 주소`}}
```

### TouchableOpacity
버튼을 만들 때 주로 사용한다.
터치 시 opacity의 변화를 주며 이벤트가 실행된다.

```javascript
  <TouchableOpacity
  activeOpacity={0.8}>
      <Tex>버튼</Tex>
  </TouchableOpacity>
```

### ScrollView
RN에서는 컨텐츠의 양이 많다고 해서 자동적으로 스크롤이 생기는 게 
아니기 때문에 ScrollView를 사용하여 스크롤이 가능하도록 만들어 주어야 한다.

### TextInput
input 같은 역할을 한다.
onChange를 사용하여 이벤트를 주어도 괜찮지만 onChangeText를 사용하면 더욱 편하게 
조작 가능하다. e.target.value를 사용하지 않아도 현재의 값을 가져올 수 있다.
비밀번호를 입력 시 값이 보이지 않아야 하기 때문에
secureTextEntry={true} 를 사용하여야 한다.

```javascript
  const onChangeName = (e) => {
      setUserName(e);
  }
  .
  .
  .
  <TextInput 
  placeholder="이름을 입력해 주세요"
  value={userName}
  style={styles.inputBox}
  onChangeText={(e) => {onChangeName(e)}}
  />
```

### FlatList 
react에서는 map을 사용하였으면 RN에서는 FlatList를 지향한다.

```javascript
  const listArr = ["A", "B", "C", "D", "E"];

  const renderListEl = ({item, index}) => {
      return(
          <Text>{item}</Text>
      )
  }

  <View>
      <FlatList
      // 반복을 할 배열
      data={listArr}
      // 렌더 할 아이템
      renderItem={renderListEl}
      // 교유 키값
      keyExtractor={(item, index) => index.toString()}
      >
  </View>
```


## Styling
1. CSS를 설정할 때 object의 namespace를 이용한다.
2. 각 스타일의 속성의 구분은 ; 가 아닌 , 로 구분한다.
3. 스타일 속성 명의 구분은 -이 아닌 대문자로 구분한다. (font-weight  -> fontWeight)
4. 'px', 'em' 등의 단위는 생략한다. -> rem 을 사용한다

```javascript
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
```

5. 축약형이 존재하지 않는다. 대신 상하, 좌우 값을 한 번에 조정할 수 있다.

```javascript
  item: {
      marginVertical: "0rem",
      marginBottom: "4rem",
      marginLeft: "6rem",
  }
```

6. :first-child, :nth-child, :focus 등의 가상, 의사, 자식, 형제 선택자를 이용할 수 없다.
7. display 속성의 값이 flex와 none 두 가지 밖에 없다.