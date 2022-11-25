import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import DeleteBtn from '../../../common/DeleteBtn';
import {delBooks} from '../../../Redux/modules/slices/selectBooksSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/store/store';
import {NaverBooksDataType} from '../../../types/bookSearch';
import BookImage from './BookImage';

type BooksViewerProps = {};

const BooksViewer = ({}: BooksViewerProps) => {
  const books = useAppSelector(state => state.selectBookReducer);

  const dispatch = useAppDispatch();

  const [deleteList, setDeleteList] = useState<
    (NaverBooksDataType | undefined)[]
  >([]);

  const handleBookClick = (book: NaverBooksDataType) => {
    const yo = [...deleteList, book];

    if (yo.filter(val => val?.isbn === book.isbn).length % 2 === 0) {
      const yes = yo.filter(val => val?.isbn !== book.isbn);
      setDeleteList([...yes]);
    } else {
      setDeleteList([...yo]);
    }
  };

  const handleBooksDelete = () => {
    dispatch(delBooks(deleteList));
  };

  return (
    <>
      <BooksViewerDiv>
        <DeleteBtnWrapper>
          <DeleteBtn handleDelete={handleBooksDelete}>
            <DelBtnSpan>도서삭제</DelBtnSpan>
          </DeleteBtn>
        </DeleteBtnWrapper>

        {Object.values(books).map(book => {
          let DeleteBookCheck = false;
          if (!book) {
            return;
          }
          deleteList.forEach(val => {
            if (val?.isbn === book.isbn) {
              DeleteBookCheck = true;
            }
          });

          return (
            <BookImage
              key={book.isbn}
              border={DeleteBookCheck}
              handleBookClick={handleBookClick}
              book={book}></BookImage>
          );
        })}
      </BooksViewerDiv>
    </>
  );
};
export default BooksViewer;

const BooksViewerDiv = styled.div`
  width: 100%;
  height: 34.2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rem;
  background-color: ${props => props.theme.AliceBlue};
`;

const DeleteBtnWrapper = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
`;

const DelBtnSpan = styled.span`
  color: ${props => {
    if (true) {
      return props.theme.MainColor;
    } else {
      return props.theme.LightGray;
    }
  }};
`;
