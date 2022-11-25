
# ODOK
![logo](https://user-images.githubusercontent.com/113868313/203928998-224f3d9f-9ec1-4421-abc9-978c6a4fbed9.png)

## 👉🏻 프로젝트 소개

  >  독서가 부족한 현대인들을 위해! 갓생을 살고싶은 현대인들을 위해! <br> 
  >  새로운 사람들과 즐겁게 얘기하며 독서 할 수 있는 웹 어플리케이션 <br> 

### [ODOK 바로가기](http://hot6-front.s3-website.ap-northeast-2.amazonaws.com/ )
### [Front-End Github](https://github.com/Hanghae-Hot6/Front) 
### [Back-End Github](https://github.com/Hanghae-Hot6/Back) 
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
 
  <br> 

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

### [API 설계 보러가기](https://www.notion.so/ckd12394/5-ODOK-5b66f278ac9044609f709d7a89deee7f)

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
|로그인|✅카카오 로그인<br>✅로그인|
|회원가입|✅회원가입<br>✅아이디 중복 체크<br>✅닉네임 중복 체크|
|메인페이지|✅무한스크롤<br>✅펫 카테고리 필터링|
|Market 상세 페이지|✅다중 이미지 슬라이더<br>✅카카오톡 공유하기<br>✅가격 비교 탭 아코디언<br>✅가격 비교하기 차트<br>✅상품 찜 기능<br>✅댓글 CRUD|
|Market 작성 페이지|✅이미지 다중 업로드<br>✅다중 이미지 슬라이더<br>✅폼 유효성 검사(제목 20자 이내, 가격 백만원 대)<br>✅유저 현재위치|
|Market 수정 페이지|✅이미지 다중 업로드<br>✅다중 이미지 슬라이더<br>✅폼 유효성 검사(제목 20자 이내, 가격 백만원 대)<br>✅유저 현재위치|
|검색 페이지|✅인기 검색어<br>✅최근 검색어<br>✅최근 검색어 자동 저장 연결 및 토글<br>✅최근 검색어 전체 삭제<br>✅최근 검색어 개별 삭제<br>✅자동 완성|
|검색 결과 페이지|✅인기순 필터링<br>✅최신순 필터링<br>|
|마이 페이지|✅로그아웃<br>✅마이페이지 차트<br>|
|내가 쓴 글|✅내가 쓴 글<br>|
|찜 리스트|✅찜 리스트<br>|
|최근 본 상품|✅최근 본 상품<br>|
|모달|✅모달 css ✅찜 기능, 게시글 삭제 기능에 연결|
|헤더|✅헤더 css ✅아이템 카테고리 필터링|
|반응형|✅모바일<br>✅태블릿 <br>✅PC|

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
<summary>- Front-end</summary>
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


