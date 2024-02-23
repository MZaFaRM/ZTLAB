import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({children, navigation}) => {
  return ( 
    <>
      <Header navigation={navigation} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
