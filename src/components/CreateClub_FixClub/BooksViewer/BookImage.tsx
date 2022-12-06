import React from 'react';
import styled from 'styled-components';
import {NaverBooksDataType} from '../../../types/bookSearch';

type BookImageProps = {
  book: NaverBooksDataType;
  handleBookClick: (book: NaverBooksDataType) => void;
  border: boolean;
};

const BookImage = ({book, handleBookClick, border}: BookImageProps) => {
  const handleClick = (book: NaverBooksDataType) => {
    handleBookClick(book);
  };

  return (
    <>
      <ImageContainer
        border={border}
        onClick={() => {
          handleClick(book);
        }}>
        <Image src={book.image} alt="no Image" />
      </ImageContainer>
    </>
  );
};
export default BookImage;

const ImageContainer = styled.div<{border: boolean}>`
  height: 22rem;
  margin: 0 3rem;
  ${props => {
    if (props.border) {
      return `border: 3px solid ${props.theme.MainColor};`;
    }
  }}
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 576px) {
    height: 18rem;
    margin: 0 1.6rem;
  }
  @media screen and (max-width: 430px) {
    height: 15rem;
    margin: 0 1.2rem;
  }
`;

const Image = styled.img`
  height: 100%;
  object-fit: contain;
`;
