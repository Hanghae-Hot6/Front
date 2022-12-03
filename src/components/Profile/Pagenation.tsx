import React, {Dispatch, SetStateAction} from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {PaginatePropsTypes} from '../../types/profile';

function Pagenation({
  page,
  pageRange,
  limit,
  total,
  maxPageNum,
  setPage,
  setPageRange,
}: PaginatePropsTypes) {
  const [index, setIndex] = useState(0);
  const [pageArr, setPageArr] = useState<number[]>([]);

  useEffect(() => {
    const sliceArr = Array(maxPageNum)
      .fill(0)
      .map((_, idx) => idx + 1)
      .slice(index * pageRange, index * pageRange + pageRange);

    setPageArr(sliceArr);
  }, [index, maxPageNum, pageRange]);

  return (
    <>
      <StNav>
        <button
          onClick={() => {
            setPage(page - 1);
            if (page <= index * pageRange + 1) {
              setIndex(prev => prev - 1);
            }
          }}
          disabled={page === 1}>
          {'<'}
        </button>
        {maxPageNum &&
          pageArr.map(num => (
            <button
              key={num + 1}
              className={num === page ? 'on' : ''}
              onClick={() => {
                setPage(num);
              }}>
              {num}
            </button>
          ))}

        <button
          onClick={() => {
            setPage(page + 1);
            if (page > index * pageRange + pageRange - 1) {
              setIndex(prev => prev + 1);
            }
          }}
          disabled={page === maxPageNum}>
          {'>'}
        </button>
      </StNav>
    </>
  );
}

export default Pagenation;
const StNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  button {
    text-align: center;
    padding: 0;
    margin: 0 5px;
    border-radius: 20%;
    width: 2rem;
    height: 2rem;
    background-color: #fff;
    color: ${props => props.theme.MainColor};
    border: 1px solid ${props => props.theme.MainColor};
  }

  .on {
    background-color: ${props => props.theme.MainColor};
    color: #fff;
  }
`;
