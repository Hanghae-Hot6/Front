import React, {ReactNode} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <section style={{width: '1280px', margin: '0 auto'}}>
        {props.children}
      </section>
      <Footer />
      <TopButton>TOP</TopButton>
    </div>
  );
};

export default Layout;

const TopButton = styled.button`
  position: fixed;
  font-size: 1rem;
  width: 5.5rem;
  height: 5.5rem;
  bottom: 20rem;
  right: 30rem;
  border: 1px solid #5200ff;
  box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: #5200ff;
  background-color: #fff;
  z-index: 10;
`;
