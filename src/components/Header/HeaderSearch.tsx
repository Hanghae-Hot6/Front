// Libraries(react관련 패키지, 그외 라이브러리)
import React, {useState, useCallback, useMemo} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import styled from 'styled-components';

//components
import HeaderSearchBooks from './HeaderSearchBooks';

// 그외 (img, css, fn, params...)
import {ClubSearchType} from '../../types/bookSearch';
import close_btn from '../../assets/Xbtn.svg';
import MagnifyingGlass from '../../assets/MagnifyingGlass.svg';
import {debouncer} from '../../utils/debouncing';

// export type NaverBooksDataType = {
//   image: string;
//   isbn: string;
//   pubdate: string;
//   title: string;
// };

const HeaderSearch = () => {
  const [showBookSearchBar, setShowBookSearchBar] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const debouncingValue = useMemo(
    () => debouncer(value => setInput(value), 500),
    [],
  );

  const fetch = async ({queryKey}: any) => {
    if (input) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/clubs/search?clubName=${queryKey[1]}&page=1&size=18`,
      );

      return response?.data.data;
    }
  };

  const {
    data: getBooksData,
    status,
    isLoading,
    error,
  } = useQuery<ClubSearchType[]>(['getBooks', input], fetch);

  let endNum: number;
  let divideBy: number;

  let NewArray: ClubSearchType[][] = [];
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      e.preventDefault();
      const {value} = e.target;
      setShowBookSearchBar(true);
      debouncingValue(value);
    },
    [debouncingValue],
  );

  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();

    setShowBookSearchBar(!showBookSearchBar);
    if (showBookSearchBar === true) {
    }
    setInput('');
  };
  return (
    <>
      <Container>
        <StInputDiv onClick={handleClick}>
          <img src={MagnifyingGlass} alt="search" />
          <input
            type="text"
            id="search-input"
            placeholder="찾으실 모임을 입력해주세요."
            onChange={handleChange}
            // value={input}
          />
          <div>
            {showBookSearchBar ? (
              <img
                src={close_btn}
                alt="닫기 버튼"
                onClick={() => setShowBookSearchBar(false)}
              />
            ) : undefined}
          </div>
        </StInputDiv>
        {/* <SearchBar type="text" onChange={handleChange} /> */}
        {showBookSearchBar && (
          <SearchBox>
            <BoxWrap>
              <Div2>
                <HeaderSearchBooks data={NewArray} width={78.3} height={40} />
              </Div2>
              <Div3></Div3>
            </BoxWrap>
          </SearchBox>
        )}
      </Container>
    </>
  );
};
export default HeaderSearch;

const Container = styled.div`
  display: flex;
  /* border: 1px solid black; */
  /* height: 40rem; */
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-right: 200px;
  width: 33%;
  @media screen and (max-width: 576px) {
    display: none;
    /* cursor: pointer;
    margin-right: 0px;
    width: 10vw; */
  }
`;
const SearchBox = styled.div`
  position: absolute;
  bottom: -1rem;
  width: 78.3rem;
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
  > img {
    position: absolute;
    left: 1.5rem;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  input {
    background: #ffffff;
    border: 1px solid ${props => props.theme.MainColor};
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
    border-radius: 26px;
    height: 4rem;
    width: 38.5rem;
    font-size: 1.4rem;
    padding-left: 5rem;
    :focus {
      border-color: ${props => props.theme.MainColor};
      outline: none;
    }

    @media screen and (max-width: 576px) {
      width: 0;
      border: none;
      box-shadow: none;
    }
  }
  div {
    cursor: pointer;
    position: absolute;
    bottom: -4.5rem;
    right: -19rem;
    z-index: 10;
    width: 3.5rem;
    height: 3rem;
    font-size: 2rem;
    line-height: 3rem;
    text-align: center;
    color: #111;
  }
`;
