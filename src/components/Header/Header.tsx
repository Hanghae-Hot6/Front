import React from 'react';
import NavigationButton from '../../common/NavigationButton';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <>
      <NavigationButton path="/login">로그인</NavigationButton>
      <NavigationButton path="/sign">회원가입</NavigationButton>
    </>
  );
};
export default Header;
