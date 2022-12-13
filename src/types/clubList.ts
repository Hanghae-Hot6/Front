export type clubDetailType = {
  accessToken: string;
  id: number | string | undefined;
  plan: string;
  memberLimit: number;
  summary: string;
  imageUrl: string;
  book1: string;
  book2: string;
  book3: string;
  bookImage1: string;
  bookImage2: string;
  bookImage3: string;
  bookIntro: string;
  bookLink1: string;
  bookLink2: string;
  bookLink3: string;
  bookName1: string;
  bookName2: string;
  bookName3: string;
  bookSummary: string;
  category: string;
  clubId: number;
  clubIntro: string;
  clubName: string;
  clubSummary: string;
  interest: boolean;
  leader: string;
  location: string;
  participantNum: number;
  period: string;
  schedule: string;
  subscription: boolean;
  thumbnail: string;
  memberMaxNum: string;
};

export type LocationState = {
  pathname: string;
  state: number | null;
  key: string | undefined;
};

export type Clubs = {
  id: string | number;
  thumbnail: string;
  clubName: string;
  memberId: string;
  category: string;
  summary: string;
  memberLimit: number;
  clubId: number;
  location: string;
  startDate: string;
  finishDate: string;
};

export type RecommendationClubType = {
  category: string;
  clubId: number;
  clubName: string;
  leader: string;
  memberLimit: string;
  summary: string;
  thumbnail: string;
  visitNum: number;
};

export type SubmitClubType = {
  clubName: string;
  category: string;
  clubIntro: string;
  book1: string;
  book2: string;
  book3: string;
  thumbnail: Blob | string;
  memberMaxNum: string;
  startDate: string;
  finishDate: string;
  location: string;
  schedule: string;
  clubSummary: string;
  bookSummary: string;
};

export const submitClubKeysInKorean = {
  clubName: '모임명',
  category: '카테고리',
  clubIntro: '한 줄 모임소개',
  thumbnail: '썸네일',
  memberMaxNum: '최대 인원',
  startDate: '시작 일시',
  finishDate: '종료 일시',
  location: '장소',
  schedule: '일정',
  clubSummary: '상세내용',
  bookSummary: '책 소개',
};
