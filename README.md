# wotube

## 프로젝트 소개

노마드 코더에서 진행하는 유튜브 클론 프로젝트로 포트폴리오 및 웹개발 능력을 올리기위해 제작했습니다. 로그인과 동영상 업로드, 댓글 작성등을 할 수 있으며 [실제페이지](https://mighty-tundra-80375.herokuapp.com)에서 동작을 확인할 수 있습니다.

<br>

## 웹페이지 소개

|                      홈                       |                     로그인                     |
| :-------------------------------------------: | :--------------------------------------------: |
| <img src="./resource/home.png" width="400px"> | <img src="./resource/login.png" width="400px"> |

|                      비디오 상세                      |                   마이 페이지                   |
| :---------------------------------------------------: | :---------------------------------------------: |
| <img src="./resource/vedeo-detail.png" width="400px"> | <img src="./resource/mypage.png" width="400px"> |

|                      비디오 삭제                      |                     업로드                      |
| :---------------------------------------------------: | :---------------------------------------------: |
| <img src="./resource/video-delete.png" width="400px"> | <img src="./resource/upload.png" width="400px"> |

<br>

## 사용한 기술 및 프로그램들

|                                      마크업                                       |                                                                          스타일링                                                                          |                                         백엔드                                          |                                                모듈번들러                                                 |
| :-------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="https://t1.daumcdn.net/cfile/tistory/21171341584531D110" width="150px"> | <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F994376385B56854A0D" width="150px"> | <img src="https://miro.medium.com/max/1051/1*q9myzo5Au8OfsaSrCodNmw.png" width="150px"> | <img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" width="150px"> |
|                                      **Pug**                                      |                                                                          **Scss**                                                                          |                                       **NodeJS**                                        |                                                **Webpack**                                                |

<br>

|                                                           DB                                                           |                                               외부 저장소                                               |                                                                                                          Oauth                                                                                                          |
| :--------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" width="180px"> | <img src="https://blog.kakaocdn.net/dn/uWqZ9/btqE0QKQrAN/UBHJpXBe2pkDRmtSVnmUZ0/img.png" width="180px"> | <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--kyypBiVD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/9ngdmhfexbyafu2p5cll.png" width="180px"> |
|                                                      **MongoDB**                                                       |                                               **AWS S3**                                                |                                                                                                      **PassPort**                                                                                                       |

<br>

## 이 프로젝트를 통해 알게 된 것

### Pug/ SCSS

기존 HTML과 CSS과는 다르게 HTML내에서 프로그래밍이 가능한 점, mixin과 includes를 통하여 구조화가 가능한점을 알았습니다. 또한 SCSS에서 클래스를 계속 이어쓰는 방식이 아닌 클래스안에 클래스 태그를 넣어서 조금더 가독성 높은 스타일링이 가능했습니다.

### nodeJS

nodeJS에 대해 배우면서 nodeJS를 지원하는 다양한 모듈을 알 수 있었고 미들웨어의 사용, 라우터 URL의 관리와 이동에 대해 알 수 있었습니다.

### MongoDB/ Mongo Atlas

mongoDB와 mongoose를 통해 DB를 구축하는 방법, 또 이를 로컬에 저장하지 않고 Atlas를 통하여 외부에 저장하는 방법에 대해 알 수 있었습니다.

### PassPort

Passport 라이브러리를 통해서 express서버에서 소셜로그인을 쉽게 구현하는 방법을 알게되었습니다. 또한 로그인 정보를 세션에 저장하여 사용자 로그인을 계속 하지 않고 유지되도록 하는 방법을 알게 되었습니다.
