import React, {ReactNode} from 'react';
import styled from 'styled-components';

type DeleteBtnProps = {
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const DeleteBtn = ({handleDelete, children}: DeleteBtnProps) => {
  return (
    <>
      <DeleteButton onClick={handleDelete}> {children}</DeleteButton>
    </>
  );
};
export default DeleteBtn;

const DeleteButton = styled.button`
  background-color: transparent;
  font-size: 1.4rem;
  font-weight: 700;
`;
