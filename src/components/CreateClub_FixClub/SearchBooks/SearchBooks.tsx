import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import BookSearchBar from '../../CreateClub2/BookSearchBar/BookSearchBar';
import HeaderSearch from '../../Header/HeaderSearch';
import {InputType} from '../Body/CreateClubBody';

type SearchBooksProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;

  width?: string;
  flex?: number;
};

const SearchBooks = ({
  input,

  setInput,
  width = '100%',
  flex,
}: SearchBooksProps) => {
  const [showNaverBookSearch, setShowNaverBookSearch] =
    useState<boolean>(false);
  const [booknameSearch, setBooknameSearch] = useState<string>('');
  const inputRef = useRef();

  useEffect(() => {
    console.log(booknameSearch);
  }, [booknameSearch]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const {value} = e.target;

    setBooknameSearch(value);
  };

  return (
    <>
      <SearchBooksDiv width={width} flex={flex}>
        <Div>
          <BookSearchInput
            type="text"
            placeholder="도서명을 입력해 주세요"
            onChange={handleChange}
            onClick={() => {
              setShowNaverBookSearch(!showNaverBookSearch);
            }}
          />
          <button
            onClick={() => {
              setShowNaverBookSearch(!showNaverBookSearch);
            }}>
            {showNaverBookSearch ? '닫기' : '찾아보기'}
          </button>
        </Div>
        {showNaverBookSearch && <BookSearchPreviewDiv></BookSearchPreviewDiv>}
      </SearchBooksDiv>
    </>
  );
};
export default SearchBooks;

const SearchBooksDiv = styled.div<{
  width: string | undefined;
  flex: number | undefined;
}>`
  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}
    
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
  height: 25.2rem;
  border: 1px solid ${props => props.theme.LightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;
