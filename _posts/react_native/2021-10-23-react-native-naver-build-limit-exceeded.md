---
layout: single
title:  "[React Native Error] OutOfMemoryError...limit exceeded"

categories:
  - React Native 
tags: 
  - [React Native, Error]

date: 2021-10-23
last_modified_at: 2021-10-23
---


안녕하세요!          
오늘은 RN 빌드 시 메모리 관련 에러를 해결겠습니다.

`java.lang.OutOfMemoryError: GC overhead limit exceeded`

![l_99203353_65_1634261256883](https://user-images.githubusercontent.com/62782245/137569401-3f40f0ff-ee99-4986-bc01-97d6e0b2c6b1.png)

해당 에러는 CPU 사용량중 98%이상 GC가 작동되는 경우 GC Overhead limit exceeded가 발생이 됩니다.

`android/gradle.properties`에서 아래와 같이 메모리를 늘려주면 됩니다.
```
# Default value: -Xmx10248m -XX:MaxPermSize=256m
# org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=4096m -XX:+HeapDumpOnOutOfMemoryError   <--이부분!
```

### GC란?
Java 쪽에서 사용하는 Garbage Collection의 약자라고 합니다.       
자바에서는 개발자가 프로그램 코드로 메모리를 명시적으로 해제하지 않기 때문에       
가비지 컬렉터(Garbage Collector)가 더 이상 필요 없는 (쓰레기) 객체를 찾아 지우는 작업을 합니다.       

 
라고 [여기에서](https://d2.naver.com/helloworld/1329) 그렇게 말하는데 쭉 읽어보니 저는 이해가 잘 가지 않습니다.       
참고만 해주세요!       



```
  🤔🤔
  개인적으로 공부한 것을 정리하는 블로그입니다.
  틀린 부분이 있거나 개선해야 할 내용은 댓글로 알려주시면 감사하겠습니다!
```