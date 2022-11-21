import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {css} from 'styled-components';
type NavigationButtonProps = {
  path?: string;
  onClickCallback?: ({...props}) => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

// navigation 이동용 버튼입니다
// onClick prop을 넣을 수 없읍니다 onClickCallback으로 넣으셔야 합니다

const NavigationButton = ({
  type,
  path,
  children,
  onClickCallback,

  ...props
}: NavigationButtonProps) => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    if (path) {
      navigate(path);
    }

    if (onClickCallback) {
      onClickCallback({...props});
    }
  };

  return (
    <>
      <NavigationButtonDefault {...props} type={type} onClick={handleClick}>
        {children}
      </NavigationButtonDefault>
    </>
  );
};
export default NavigationButton;

const NavigationButtonDefault = styled.button`
  font-size: 30px;
  width: 220px;
  color: blue;
  font-family: 'Pretendard-Regular', sans-serif;
  cursor: pointer;
`;
