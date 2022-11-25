import React from 'react';
import styled from 'styled-components';

type BookImageProps = {
  url: string | undefined;
};

const BookImage = ({url}: BookImageProps) => {
  return (
    <>
      <ImageContainer>
        <Image src={url} alt="no Image" />
      </ImageContainer>
    </>
  );
};
export default BookImage;

const ImageContainer = styled.div`
  height: 22rem;
  margin: 0 3rem;
`;

const Image = styled.img`
  height: 100%;
  /* display: block; */

  object-fit: contain;
`;
