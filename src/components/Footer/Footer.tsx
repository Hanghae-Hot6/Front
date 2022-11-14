import React from 'react';
import styled from 'styled-components';
type FooterProps = {};

const Footer = ({}: FooterProps) => {
  // fe 3 be 3 designer 1 github link
  return (
    <FooterWrap>
      <FooterLayout>
        <FooterLeft>logo</FooterLeft>
        <FooterRight>
          <ul>
            <li>
              FE
              <ul>
                <li>
                  <a href="">서지운</a>
                </li>
                <li>
                  <a href="">조재신</a>
                </li>
                <li>
                  <a href="">국경훈</a>
                </li>
              </ul>
            </li>
            <li>
              BE
              <ul>
                <li>
                  <a href="">류창민</a>
                </li>
                <li>
                  <a href="">박현도</a>
                </li>
                <li>
                  <a href="">조계일</a>
                </li>
              </ul>
            </li>
            <li>
              DESIGNER
              <ul>
                <li>장승주</li>
              </ul>
            </li>
          </ul>
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

const FooterRight = styled.div`
  ul {
    display: flex;
  }
`;
