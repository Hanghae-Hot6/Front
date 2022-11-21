import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import styled from 'styled-components';
import CarouselBooks from '../../components/CreateClub/CarouselBooks/CarouselBooks';
import MagnifyingGlass from '../../assets/MagnifyingGlass.svg';
type BookSearchBarProps = {};

export type NaverBooksDataType = {
  image: string;
  isbn: string;
  pubdate: string;
  title: string;
};

const BookSearchBar = ({}: BookSearchBarProps) => {
  const [input, setInput] = useState<string>('');
  const {
    data: getBooksData,
    status,
    isLoading,
    error,
  } = useQuery<NaverBooksDataType[]>('getBooks', async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/book/search?keyword=${input}&start=1&display=12`,
    );

    return response?.data.data;
  });

  let endNum: number;
  let divideBy: number;

  let yo: NaverBooksDataType[][] = [];
  if (status === 'success') {
    if (getBooksData) {
      divideBy = 3;
      endNum = Math.ceil(getBooksData.length / 3);
      let yo2 = [];
      for (let i = 0; i < endNum; i++) {
        for (let k = 0; k < 3; k++) {
          yo2.push(getBooksData[k + 3 * i]);
        }
        yo.push(yo2);
        yo2 = [];
      }
    }
  }
  console.log(yo);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('getBooks');
  }, [input]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const {value} = e.target;

    setInput(value);
  };

  const mockData: NaverBooksDataType[] = [
    {
      title: '유럽 도시 기행 1',
      image: '/assets/1.jpg',
      isbn: 'string',
      pubdate: 'string',
    },
  ];

  return (
    <>
      <Container>
        <StInputDiv>
          <img src={MagnifyingGlass} alt="" />
          <input
            type="text"
            placeholder="독서모임 찾아보기"
            onChange={handleChange}
          />
        </StInputDiv>
        {/* <SearchBar type="text" onChange={handleChange} /> */}
        <Div1>
          <Div2>
            <CarouselBooks data={yo} width={40} height={30} />
          </Div2>
          <Div3></Div3>
        </Div1>
      </Container>
    </>
  );
};
export default BookSearchBar;

const Container = styled.div`
  display: flex;
  /* border: 1px solid black; */
  width: 60rem;
  height: 40rem;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: -300px;
`;

const Div1 = styled.div`
  display: flex;
  height: 100%;
`;
const Div2 = styled.div`
  width: 40rem;
  height: 100%;
  background-color: aliceblue;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  position: relative;
  img {
    position: absolute;
    left: 1.5rem;
  }
  input {
    background: #ffffff;
    border: 1px solid #5200ff;
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
    border-radius: 26px;
    height: 4.8rem;
    width: 42.5rem;
    font-size: 1.8rem;
    padding-left: 5rem;
    :focus {
      border-color: #5200ff;
      outline: none;
    }
  }
`;
