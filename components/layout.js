import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({children, profileImg}) => {
  return (
    <>
      <Header profileImg={profileImg}/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
