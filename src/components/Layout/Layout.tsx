import React, {ReactNode} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
    </div>
  );
};

export default Layout;
