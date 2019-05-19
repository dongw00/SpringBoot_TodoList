# 🧘‍♀️ Spring Boot Todo 🧘‍♂️



## :mega: Intro

Todo list project! <br />
투두 리스트 프로젝트 <br />
<br />

## 😎 Stack

- Spring Boot2
- React 16.8
  <br />

## Project execution

```
mvn clean install
./mvnw spring-boot:run
```

> Default port number : 5000

<br />

## Test product

⭕️AWS Elastic Beanstalk
↓↓↓↓↓↓↓↓↓↓
http://springboottodo-env.8bx6fgrwpb.ap-northeast-2.elasticbeanstalk.com/

<br />

## REST API (Swagger)

http://springboottodo-env.8bx6fgrwpb.ap-northeast-2.elasticbeanstalk.com/swagger-ui.html

## Project File structure

#### FrontEnd part

- `/frontend/` : FrontEnd directory (React)
  - `components/AlertMessage.js` : Alert message component
  - `components/AppNavbar.js` : Navigation bar component
  - `components/TodoEdit.js` : if (URL param ? Edit Mode : Add Mode)
  - `components/TodoList.js` : return todolist in Database component

#### BackEnd part

- `/src/` : BackEnd directory (Spring boot)
  - `config/Swagger2Config.java` : Swagger2 configuration
  
  - `model/TodoList.java` : Define todolist entitiy
  - `model/TodoListRepository.java` : Repository
  
  - `restController/TodoController.java` : Rest API controller
