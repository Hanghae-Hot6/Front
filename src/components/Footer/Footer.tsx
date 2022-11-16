import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';

const Footer = () => {
  // fe 3 be 3 designer 1 github link
  return (
    <FooterWrap>
      <FooterLayout>
        <FooterLeft>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </FooterLeft>
        <FooterRight>
          <Position>
            <li>
              FE
              <ul>
                <li>
                  <a href="https://github.com/MildColor" target="_target">
                    서지운
                  </a>
                </li>
                <li>
                  <a href="https://github.com/1005jsc" target="_target">
                    조재신
                  </a>
                </li>
                <li>
                  <a href="https://github.com/kyunghoonkook" target="_target">
                    국경훈
                  </a>
                </li>
              </ul>
            </li>
            <li>
              BE
              <ul>
                <li>
                  <a href="https://github.com/ryucm" target="_target">
                    류창민
                  </a>
                </li>
                <li>
                  <a href="https://github.com/atto08" target="_target">
                    박현도
                  </a>
                </li>
                <li>
                  <a href="https://github.com/chokyeil" target="_target">
                    조계일
                  </a>
                </li>
              </ul>
            </li>
            <li>
              DESIGNER
              <ul>
                <li>장승주</li>
              </ul>
            </li>
          </Position>
        </FooterRight>
      </FooterLayout>
    </FooterWrap>
  );
};
export default Footer;

const FooterWrap = styled.section`
  width: 1280px;
  margin: 5rem auto;
`;

const FooterLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterLeft = styled.div``;

const FooterRight = styled.div``;

const Position = styled.ul`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
  ul {
    margin-top: 0.7rem;
    li {
      margin-bottom: 0.7rem;
      font-size: 1.2rem;
    }
  }
`;
