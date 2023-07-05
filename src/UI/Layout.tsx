import React from 'react';
import classes from './Layout.module.css';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import HomepagePrompt from '../Components/HomepagePrompt';
import { Outlet, useLocation } from 'react-router-dom';
import MobileMenu from '../Components/MobileMenu';
import HomepagePicker from '../Components/HomepagePicker';

const Layout = () => {
  const page = useLocation().pathname;
  return (
    <div className={classes.layout}>
      <HomepagePrompt />
      <div className={classes.rootContainer}>
        <Header />
        <div className={classes.mainContainer}>
          <Outlet />
          <MobileMenu />
          {page === '/home' && <HomepagePicker />} <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
