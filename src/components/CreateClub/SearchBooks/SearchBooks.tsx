import React, {useState} from 'react';

import styled from 'styled-components';
import BookSearchBar from '../BookSearchBar/BookSearchBar';

type SearchBooksProps = {};

const SearchBooks = ({}: SearchBooksProps) => {
  const [showBookSearchBar, setShowBookSearchBar] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    setShowBookSearchBar(!showBookSearchBar);
  };

  return (
    <>
      <Div>
        <Button onClick={handleClick}>
          {showBookSearchBar ? '닫기' : '추가로 읽을 책 추가하기'}
        </Button>
        {showBookSearchBar && <BookSearchBar />}
      </Div>
    </>
  );
};
export default SearchBooks;

const Button = styled.button``;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
