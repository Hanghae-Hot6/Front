import React, {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

import styled from 'styled-components';

type CommonButtonProps = {
  path?: string;

  onClickCallback?: ({...props}) => void;
  children?: React.ReactNode;
};

const CommonButton = ({
  path,
  onClickCallback,

  children,
  ...props
}: CommonButtonProps) => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    if (path) {
      navigate(path);
    }

    if (onClickCallback) {
      onClickCallback({});
    }
  };

  return (
    <>
      <button {...props}>{children}</button>
    </>
  );
};
export default CommonButton;
