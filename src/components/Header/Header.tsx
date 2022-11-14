import React from 'react';
import NavigationButton from '../../common/NavigationButton';
import {getAccessToken, getUserId} from '../../utils';
type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const accessToken = getAccessToken();
  const userId = getUserId();
  // accessToken이 존재하면 Login 상태
  const isLogin = accessToken !== null;

  return (
    <>
      {isLogin ? (
        <>
          <NavigationButton path={`/profile/${userId}`}>
            마이페이지
          </NavigationButton>
          <NavigationButton
            path={`/login`}
            onClickCallback={() => {
              localStorage.removeItem('Authorization');
              localStorage.removeItem('userId');
            }}>
            로그아웃
          </NavigationButton>
        </>
      ) : (
        <>
          <NavigationButton path="/login">로그인</NavigationButton>
          <NavigationButton path="/sign">회원가입</NavigationButton>
        </>
      )}
    </>
  );
};
export default Header;
