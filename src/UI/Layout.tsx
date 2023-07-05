import React from 'react';
import classes from './Layout.module.css';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import HomepagePrompt from '../Components/HomepagePrompt';
import { Outlet } from 'react-router-dom';
import MobileMenu from '../Components/MobileMenu';

const Layout = () => {
  return (
    <div className={classes.layout}>
      <HomepagePrompt />
      <div className={classes.rootContainer}>
        <Header />
        <div className={classes.mainContainer}>
          <Outlet />
          <MobileMenu />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
