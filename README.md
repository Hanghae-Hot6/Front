
# ODOK
![logo](https://user-images.githubusercontent.com/113868313/203928998-224f3d9f-9ec1-4421-abc9-978c6a4fbed9.png)

## 👉🏻 프로젝트 소개

  >  독서가 부족한 현대인들을 위해! 갓생을 살고싶은 현대인들을 위해! <br> 
  >  새로운 사람들과 즐겁게 얘기하며 독서 할 수 있는 웹 어플리케이션 <br> 

### [ODOK 바로가기](http://hot6-front.s3-website.ap-northeast-2.amazonaws.com/ )
### [Front-End Github](https://github.com/Hanghae-Hot6/Front) 
### [Back-End Github](https://github.com/Hanghae-Hot6/Back) 
### [Project Notion](https://www.notion.so/ckd12394/5-ODOK-5b66f278ac9044609f709d7a89deee7f)
<br>
<hr>
<br>

## 👨‍👩‍👧 팀원 소개  

|이름|깃허브 주소|포지션|
|---|---|---|
|서지운|[MildColor의 github](https://github.com/MildColor)|Frontend|
|조재신|[1005jsc의 github](https://github.com/1005jsc)|Frontend|
|국경훈|[kyunghoonkook의 github](https://github.com/kyunghoonkook)|Frontend|
|류창민|[ryucm의 github](https://github.com/ryucm)|Backend|
|조계일|[chokyeil의 github](https://github.com/chokyeil)|Backend|
|박현도|[atto08의 github](https://github.com/atto08)|Backend|
|장승주||DESIGNER|


<br>
<hr>
<br>


## ⚙️ 서비스 아키텍처 
![서비스아키텍쳐ver_2](https://user-images.githubusercontent.com/113868313/203928554-51132feb-8af7-4d71-9a89-394840b51b5b.png)


<br>

<br>

## 📅 프로젝트 기간   

기간 : 2022년 11월 03일 ~ 2022년 12월 16일(6주)

<br>

<br>

## 🛠 기술 스택

<div align=center> 
   <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
 <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>
  <br> 

  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
  <img src="https://img.shields.io/badge/Stomp-353535?style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
  <br>
  
    

  <br>
</div>

<br>

<br> 

## 🗺 API 설계 

<details>
<summary>API</summary>
<div markdown="1">   
    
  ![image](https://user-images.githubusercontent.com/113868313/203936279-6962e53b-776e-454c-a077-f79c57c022e7.png)
  ![image](https://user-images.githubusercontent.com/113868313/203936319-c932153e-2c61-4327-b065-deb6e03bdc01.png)
  ![image](https://user-images.githubusercontent.com/113868313/203936355-5d833550-0cba-4213-8064-bf55cb766fa6.png)
  ![image](https://user-images.githubusercontent.com/113868313/203936394-9a2d9cee-5677-4344-aa54-6272748dd76b.png)
  ![image](https://user-images.githubusercontent.com/113868313/203936442-f38ec82a-195c-47c2-b78b-b859d0058216.png)

</div>
</details>


<br>

<br>

## ✒ 와이어 프레임 

### [Figma 보러가기](https://www.figma.com/file/PTN0SpVnreH7JxRmfFmA32/%ED%95%AD%ED%95%B499_%EC%98%A4%EB%8F%85?node-id=0%3A1&t=e7SJsG8aMZCz08ou-0)

<br>
<br>

## 🔨 기술 도입 이유 - 라이브러리, 기술적 의사 결정
| 스택| 도입 이유 |버전|
|--|--|--|
| TypeScript | 프로젝트 내의 데이터 흐름을 체계적으로 만들기 위해 타입스크립트 도입 자바스크립트는 다이나믹 타입이기 때문에 런타임시 오류가 남 —> 배포 후 오류가 생길 수 있음 타입스크립트는 스태틱 타입이기 때문에 개발 과정 중에 오류를 확인 할 수 있음 |^4.4.2|
|Styled-components  | css & 자바스크립트 적 연산을 동시에 사용하기 위해 styled-components 사용 |^5.3.6
|React-Query | 기존에 서버와 클라이언트 데이터 연동 작업을 Redux thunk로 사용했다. 하지만 Redux, Redux toolkit, Redux thunk가 제공해주는 기초 세팅 작업이 굉장히 불편하였다. 더불어 서버와의 통신 status관리를 개발자가 직접 관리해야 되는 점, 데이터 저장 caching을 직접 짜야 하는 점, 하나의 store에 클라이언트 데이터와 서버 데이터가 공존 하게 되는 점 등과 같이 불편한 점이 많았는데, 이를 개선하기 위해 서버 통신 간 status 관리, 통신 이후 데이터 상태 관리를 간편한 인터페이스로 제공, 서버 & 클라이언트 데이터를 분리, get한 데이터에 대해 update를 하면 자동으로 get수행 하는 등 보다 유연한 작업을 위해 React Query를 도입하게 되었다 |^3.39.2
|Axios | JS 내장 기능이 아니기 때문에 import를 해줘야 하는 번거로움과 무거움이 다소 있지만 다음과 같은 편리한 기능 때문에 도입했다. JSON 데이터 자동 변환 / axios interceptor & 간결한 instance 기능 |^1.1.3
|Socket, StompJs |채팅 기능을 구현하기 위해서는 단방향적인 http통신을 쓰는 것보다 양방향적으로 통신을 가능하게하는 라이브러리가 필요로 했다. 여러가지 양방향 통신 라이브러리중, Spring 서버의 성격과 가장 잘 맞은 SockJs, Stomp라이브러리를 사용하였다 |^6.1.2

## ✨ 주요 기능  
|페이지|API 연결, 기능 및 CSS|
|---|---|
|로그인 - 서지운|✅카카오 로그인<br>✅로그인|
|회원가입 - 서지운|✅회원가입<br>✅아이디 중복 체크<br>✅닉네임 중복 체크|
|마이 페이지 - 서지운|✅로그아웃<br>✅마이페이지 차트<br>|
|메인페이지 - 국경훈|✅배너<br>✅카테고리<br>✅인기모임 <br>✅상단TOP 버튼|
|모임 전체 페이지 - 국경훈|✅카테고리 별 sort<br>|
|모임 상세 페이지 - 국경훈|✅등록된 모임 정보 불러오기<br>|
|모임 관심 - 국경훈|✅관심 모임 등록<br>|
|모임 참석/탈퇴 - 국경훈|✅모임 가입하기 탈퇴하기<br>|
|모임 작성 페이지 - 조재신|✅|
|모임 수정 페이지 - 조재신|✅|
|채팅 - 조재신|✅|
|모임 삭제 기능 - 서지운|✅|
|검색 기능 - 조재신|✅|
|모달 - 서지운|✅모달 css ✅|
|헤더 - 서지운 & 국경훈|✅헤더 css <br> ✅헤더 검색|
|푸터 - 국경훈|✅푸터 css|
|반응형 - 전체|✅모바일<br>✅PC|

<br>
<br>

## 🎯 트러블 슈팅 



<br>
<br>

## 👩‍💻 유저 피드백 및 개선 사항


<br>

<br>

## 👻 추가하고 싶은 기능 

<details>
<summary> Front-end</summary>
<div markdown="1">   
    
    - 반응형 도입 — 모바일ver
    - 보안 강화 — https
    - infinite carousel
    - infinite scroll — 모바일ver
    - 검색, 좋아요등 서버에 부하가 올 수 있는 api call 최적화
    - 이미지 용량 최적화
    - 채팅에서 이미지 전송 기능 추가
    - 후기 기능
    - api instance
    - 과거 채팅 무한 스크롤로 불러오기
</div>
</details>

 

   

<br>
<hr>
<br>


