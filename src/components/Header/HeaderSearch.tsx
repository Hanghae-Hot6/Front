import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import styled from 'styled-components';

import MagnifyingGlass from '../../assets/MagnifyingGlass.svg';
import {NaverBooksDataType} from '../../types/bookSearch';
import HeaderSearchBooks from './HeaderSearchBooks';
type BookSearchBarProps = {};

// export type NaverBooksDataType = {
//   image: string;
//   isbn: string;
//   pubdate: string;
//   title: string;
// };

const BookSearchBar = ({}: BookSearchBarProps) => {
  const [showBookSearchBar, setShowBookSearchBar] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const fetch = async ({queryKey}: any) => {
    if (input) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/book/search?keyword=${queryKey[1]}&start=1&display=12`,
      );

      return response?.data.data;
    }
  };

  const {
    data: getBooksData,
    status,
    isLoading,
    error,
  } = useQuery<NaverBooksDataType[]>(['getBooks', input], fetch);

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
  // console.log(yo);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const {value} = e.target;

    setInput(value);
  };
  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();

    setShowBookSearchBar(!showBookSearchBar);
  };
  return (
    <>
      <Container>
        <StInputDiv onClick={handleClick}>
          <img src={MagnifyingGlass} alt="" />
          <input
            type="text"
            placeholder="도서 찾기"
            onChange={handleChange}
            value={input}
          />
          <div onClick={handleClick}>{showBookSearchBar ? 'X' : undefined}</div>
        </StInputDiv>
        {/* <SearchBar type="text" onChange={handleChange} /> */}
        {showBookSearchBar && (
          <SearchBox>
            <BoxWrap>
              <Div2>
                <HeaderSearchBooks data={NewArray} width={42} height={30} />
              </Div2>
              <Div3></Div3>
            </BoxWrap>
          </SearchBox>
        )}
      </Container>
    </>
  );
};
export default BookSearchBar;

const Container = styled.div`
  display: flex;
  /* border: 1px solid black; */
  /* height: 40rem; */
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 33%;
`;
const SearchBox = styled.div`
  position: absolute;
  bottom: -1rem;
  width: 42rem;
`;
const BoxWrap = styled.div`
  display: flex;
  height: 100%;
`;
const Div2 = styled.div`
  width: 100%;
  height: 100%;
`;
const Div3 = styled.div`
  flex: 2;
  background-color: gold;
  height: 100%;
`;
const SearchBar = styled.input`
  height: 2rem;
`;

const StInputDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: absolute;
    left: 1.5rem;
  }
  input {
    background: #ffffff;
    border: 1px solid #5200ff;
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
    border-radius: 26px;
    height: 4rem;
    width: 38.5rem;
    font-size: 1.4rem;
    padding-left: 5rem;
    :focus {
      border-color: #5200ff;
      outline: none;
    }
  }
  div {
    cursor: pointer;
    position: absolute;
    bottom: -4.2rem;
    right: -2rem;
    z-index: 10;
    width: 3.5rem;
    height: 3rem;
    font-size: 2rem;
    line-height: 3rem;
    text-align: center;
    color: #111;
  }
`;