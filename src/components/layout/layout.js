import React from 'react';
import Header from './header';
import Footer from './footer';
import { pages } from '../../constants/constants';

const Layout = ({children, navigation, currentPage}) => {
  return ( 
    <>
      <Header navigation={navigation} />
      {children}
      <Footer currentPage={currentPage}/>
    </>
  );
};

export default Layout;
