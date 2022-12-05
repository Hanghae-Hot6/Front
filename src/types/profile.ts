import {Dispatch, SetStateAction} from 'react';

export type CheckPasswordModalProps = {
  setIsPWCorrect: Dispatch<SetStateAction<boolean>>;
  isPWCorrect: boolean;
};

export type PaginatePropsTypes = {
  page: number;
  pageRange: number;
  limit: number;
  total: number | undefined;
  maxPageNum: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPageRange: Dispatch<SetStateAction<number>>;
};
