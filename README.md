# wotube

## 프로젝트 소개

노마드 코더에서 진행하는 유튜브 클론 프로젝트로 포트폴리오 및 웹개발 능력을 올리기위해 제작했습니다. 로그인과 동영상 업로드, 댓글 작성등을 할 수 있으며 [실제페이지](https://mighty-tundra-80375.herokuapp.com)에서 동작을 확인할 수 있습니다.

<br>

## 웹페이지 소개

|                       홈                       |                    로그인                     |
| :--------------------------------------------: | :---------------------------------------------: |
| <img src="./resource/home.png" width="400px"> | <img src="./resource/login.png" width="400px"> |

|                     비디오 상세                     |                      마이 페이지                       |
| :----------------------------------------------------: | :---------------------------------------------: |
| <img src="./resource/vedeo-detail.png" width="400px"> | <img src="./resource/mypage.png" width="400px"> |

|                     비디오 삭제                     |                      업로드                       |
| :----------------------------------------------------: | :---------------------------------------------: |
| <img src="./resource/video-delete.png" width="400px"> | <img src="./resource/upload.png" width="400px"> |


<br>

## 사용한 기술 및 프로그램들
|마크업|스타일링|백엔드|모듈번들러|
|:----:|:----:|:----:|:----:|
| <img src="https://t1.daumcdn.net/cfile/tistory/21171341584531D110" width="135px"> |<img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F994376385B56854A0D" width="100px"> |<img src="https://miro.medium.com/max/1051/1*q9myzo5Au8OfsaSrCodNmw.png" width="110px"> |<img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" width="110px">
|**Pug**|**Scss**|**NodeJS**|**Webpack**|

<br>

|DB|외부 저장소|Oauth|
|:----:|:----:|:----:|
| <img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" width="135px"> |<img src="https://blog.kakaocdn.net/dn/uWqZ9/btqE0QKQrAN/UBHJpXBe2pkDRmtSVnmUZ0/img.png" width="100px"> |<img src="data:image/png;base64,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" width="110px"> 
|**MongoDB**|**AWS S3**|**PassPort**|


