import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {openGlobalModal} from '../../../Redux/modules/slices/modalSlice';
import {NaverBooksDataType} from '../../../types/bookSearch';
import {SubmitClubType} from '../../../types/clubList';

import HeaderSearch from '../../Header/HeaderSearch';

import BooksViewer from '../BooksViewer/BooksViewer';
import {CreateClubButton} from '../common/CreateClubDesigns';
import PaginationBooks from './PaginationBooks';

type SearchBooksProps = {};

const SearchBooks = ({}: SearchBooksProps) => {
  const [showNaverBookSearch, setShowNaverBookSearch] =
    useState<boolean>(false);
  const [booknameSearch, setBooknameSearch] = useState<string>('');

  // booknameSearch로 네이버에서 북 리스트 받아오기

  const fetch = async ({queryKey}: any) => {
    if (booknameSearch) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/book/search?keyword=${queryKey[1]}&start=1&display=16`,
      );

      return response?.data.data;
    }
  };

  const {
    data: getBooksData,
    status,
    isLoading,
    error,
  } = useQuery<NaverBooksDataType[]>(
    ['getCreateClubBooks', booknameSearch],
    fetch,
  );

  // 16개 받아온 책들 pagination으로 정리하기

  let endNum: number;
  let divideBy: number;

  let NewArray: NaverBooksDataType[][] = [];
  if (status === 'success') {
    if (getBooksData) {
      divideBy = 3;
      endNum = Math.ceil(getBooksData.length / 3);
      let NewPushArray = [];
      for (let i = 0; i < endNum; i++) {
        for (let k = 0; k < 3; k++) {
          NewPushArray.push(getBooksData[k + 3 * i]);
        }
        NewArray.push(NewPushArray);
        NewPushArray = [];
      }
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const {value} = e.target;

    setBooknameSearch(value);
  };

  return (
    <>
      <SearchBooksDiv>
        <Div>
          <BookSearchInput
            type="text"
            placeholder="도서명을 입력해 주세요"
            onChange={handleChange}
            onClick={() => {
              setShowNaverBookSearch(true);
            }}
          />
          <CreateClubButton
            onClick={() => {
              setShowNaverBookSearch(!showNaverBookSearch);
            }}>
            {showNaverBookSearch ? '닫기' : '찾아보기'}
          </CreateClubButton>
        </Div>
        {showNaverBookSearch && (
          <BookSearchPreviewDiv>
            <PaginationBooks
              data={NewArray}
              borderWidth={80}
              borderHeight={40}
            />
          </BookSearchPreviewDiv>
        )}

        {<BooksViewer />}
      </SearchBooksDiv>
    </>
  );
};
export default SearchBooks;

const SearchBooksDiv = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
`;

const Div = styled.div`
  height: 5.8rem;
  width: 100%;
  border: 1px solid ${props => props.theme.LightGray};
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const BookSearchInput = styled.input`
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
  width: 80%;
  height: 80%;
  border: none;
  outline: none;
`;

const BookSearchPreviewDiv = styled.div`
  width: 100%;
  height: 45.3rem;
  border: 1px solid ${props => props.theme.LightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;
