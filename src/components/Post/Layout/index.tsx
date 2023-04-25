import * as React from 'react';
import Footer from '../../Footer';
import Header from '../../Header';

import './index.scss';
import '../../../style/reset.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
