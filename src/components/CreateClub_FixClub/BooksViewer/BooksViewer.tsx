import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import DeleteBtn from '../../../common/DeleteBtn';
import {
  delBooks,
  emptyBooks,
} from '../../../Redux/modules/slices/selectBooksSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/store/store';
import {NaverBooksDataType} from '../../../types/bookSearch';
import BookImage from './BookImage';

type BooksViewerProps = {};

const BooksViewer = ({}: BooksViewerProps) => {
  const books = useAppSelector(state => state.selectBooksReducer);

  console.log(books);

  const dispatch = useAppDispatch();

  const [deleteList, setDeleteList] = useState<
    (NaverBooksDataType | undefined)[]
  >([]);

  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

  const handleBookClick = (book: NaverBooksDataType) => {
    const yo = [...deleteList, book];

    if (yo.filter(val => val?.isbn === book.isbn).length % 2 === 0) {
      const yes = yo.filter(val => val?.isbn !== book.isbn);
      setDeleteList([...yes]);
    } else {
      setDeleteList([...yo]);
    }
  };

  useEffect(() => {
    if (deleteList.filter(val => val).length === 0) {
      setDeleteToggle(false);
    } else {
      setDeleteToggle(true);
    }
  }, [deleteList.length]);

  const handleBooksDelete: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    setDeleteList([]);

    dispatch(delBooks(deleteList));
  };

  return (
    <>
      <BooksViewerDiv>
        <DeleteBtnWrapper>
          <DeleteBtn handleDelete={handleBooksDelete}>
            <DelBtnSpan textColor={deleteToggle}>도서삭제</DelBtnSpan>
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
  top: 1rem;
  right: 1rem;
`;

const DelBtnSpan = styled.span<{textColor: boolean}>`
  font-size: 2rem;
  ${props => {
    if (props.textColor) {
      return `color: ${props.theme.MainColor};`;
    } else {
      return `color: ${props.theme.Gray};`;
    }
  }};
`;
