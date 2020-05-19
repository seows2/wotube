# 웹설

## [nodeJS](https://nodejs.org/en/)랑 [몽고DB](https://www.mongodb.com/download-center/community) 까셔야 합니다!!!

까신 뒤

```bash
node -v  => 노드JS
mongod   => 몽고DB
```

를 터미널에 입력해서 잘 깔렸는지 확인해봅시당

<br>

설치

```bash
git clone https://github.com/seows2/wotube

cd wotube

npm install

```

<br>

서버를 키기 위해서 터미널에서 `npm run dev:server` 입력해주세요.  
css 작업을 하기 위해서는 또 다른 터미널에서 `npm run dev:assets` 또한 입력해주세요.  
vscode와 크롬을 통한 개발을 추천드립니다.  
기본 PORT는 4000번이나 PORT 번호 바꿔야 하시는 분은 .env파일에서 PORT를 바꾸시거나 init.js 파일에서

```js
const PORT = 원하는 포트;
```

해당 부분을 변경해주세영

<br>

## 폴더 구조 설명

- ### assets

  - js  
    자바스크립트를 통한 html 태그 생성 로직입니다. 댓글 추가, 삭제, 비디오 녹화 로직이고 전부 main.js에 임포트 시켜서 관리하고 있습니다.
  - scss  
    scss 파일입니다. css와 같습니다. 전부 styles.scss에 임포트 시켜 관리합니다.

<br>

- ### controllers

  MVC패턴중 Conroller 부분입니다. user 로직과 video 로직 2가지의 컨트롤러로 나눴고, userController에는 로그인, 회원가입, 프로파일 변경등 videoController는 홈화면 렌더, 업로드, 검색, 댓글등의 로직이 있습니다.

  <br>

- ### model

  DB입니다. Comment, User, Video DB가 있습니다.

  <br>

- ### routers

  서버로 오는 URL 주소와 GET, POST 요청에 따라 수행해야하는 Conroller를 적어놓은 것 입니다 예를 들면 globalRouter에 L.23은

  ```js
  globalRouter.post(routes.join, onlyPublic, postJoin, postlogin);
  ```

  **routes.join (/join) URL**을 통해 **post** 요청이 오면 onlyPublic 함수와 PostJoin 함수, postLogin 함수를 실행하라 라는 문장입니다.

  <br>

- ### view

  html 입니다. pug를 기반으로 짰지만 html을 아시면 이해하는데 큰 무리 없습니다.

  <br>

- ### middlewares.js

  라우터 요청 중간중간에 끼어들어 실행될 수 있는 함수?? 입니다. 예를 들면 localMiddleware 함수를 보면 res메세지 siteName에 KGU web이라는 이름을 붙여준걸 볼 수 있는데 홈페이지 타이틀에 KGU web이 어느 URL을 가든 따라가는 모습을 볼 수 있습니다.  
   또한 loggedUser같은 경우에는 req.user 또는 null 값을 붙여줬는데 만약 유저가 로그인 상태라면 req.user라는 값이 있지만 비로그인시에는 존재하지 않습니다.

  ```js
  export const localMiddleware = (req, res, next) => {
    console.log(req.user);
    res.locals.siteName = 원하는 사이트명;
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
  };
  ```

  위처럼 변경한 뒤 홈페이지를 돌아다니며 찍히는 log를 보시면 이해가 쉬울 겁니다.  
  이를 응용하여 onlyPublic (오직 비로그인 유저만 접근 가능) onlyPrivate (오직 로그인 유저만 접근 가능) 등의 로직을 만들었습니다.

  <br>

- ### routes
  사용되는 라우터를 정리하며 파일에 객체로 표현했습니다.

<br>

나머지 언급 안한 파일은 딱히 수정 할 필요가 느껴지지 않는 파일입니다.
