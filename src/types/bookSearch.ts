export type NaverBooksDataType = {
  image: string;
  isbn: string;
  pubdate: string;
  title: string;
  description?: string;
};

export type ClubSearchType = {
  category: string;
  clubId: number;
  clubName: string;
  finishDate: string;
  leader: string;
  location: string;
  memberLimit: string;
  startDate: string;
  summary: string;
  thumbnail: string;
  visitNum: number;
};
