import React from 'react';
import styled from 'styled-components';

type DeleteBtnProps = {
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
};

const DeleteBtn = ({handleDelete}: DeleteBtnProps) => {
  return (
    <>
      <DeleteButton onClick={handleDelete}> DelBtn</DeleteButton>
    </>
  );
};
export default DeleteBtn;

const DeleteButton = styled.button`
  background-color: white;
  font-size: 1.4rem;
  font-weight: 700;
`;
