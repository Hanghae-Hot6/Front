import React from 'react';
import styled from 'styled-components';
import {useAppSelector} from '../../../Redux/store/store';
import BookImage from './BookImage';

type BooksViewerProps = {};

const BooksViewer = ({}: BooksViewerProps) => {
  const books = useAppSelector(state => state.selectBookReducer);

  return (
    <>
      <BooksViewerDiv>
        {Object.values(books).map(book => {
          if (book) {
            return <BookImage url={book?.image}></BookImage>;
          }
        })}
      </BooksViewerDiv>
    </>
  );
};
export default BooksViewer;

const BooksViewerDiv = styled.div`
  width: 100%;
  height: 34.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rem;
  background-color: ${props => props.theme.AliceBlue};
`;
