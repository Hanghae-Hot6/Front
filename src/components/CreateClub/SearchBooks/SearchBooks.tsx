import React from 'react';
import GlobalModal from '../../../common/GlobalModal';

type SearchBooksProps = {};

const SearchBooks = ({}: SearchBooksProps) => {
  return (
    <>
      <GlobalModal
        id="SearchBooks"
        type="alertModal"
        confirmPath="/create_club">
        책 찾기
      </GlobalModal>
    </>
  );
};
export default SearchBooks;
