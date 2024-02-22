import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({children, profileImg, navigation}) => {
  return (
    <>
      <Header profileImg={profileImg} navigation={navigation} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
