import {useState, useEffect} from 'react';
import {PaginatePropsTypes} from '../../types/profile';
import * as P from './Profile.style';
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
      <P.StNav>
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
      </P.StNav>
    </>
  );
}

export default Pagenation;
