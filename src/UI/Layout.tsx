import React from 'react';
import classes from './Layout.module.css';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import HomepagePrompt from '../Components/HomepagePrompt';
import { Outlet, useLocation } from 'react-router-dom';
import MobileMenu from '../Components/MobileMenu';
import HomepagePicker from '../Components/HomepagePicker';
import { useAppSelector } from '../Store/store';

const Layout = () => {
  const prompt = useAppSelector((state) => state.news.homepagePrompt);
  const page = useLocation().pathname;
  return (
    <div className={classes.layout}>
      {prompt && <HomepagePrompt />}
      <div className={classes.rootContainer}>
        <Header />
        <div className={classes.mainContainer}>
          {page === '/home' && <HomepagePicker />} <Sidebar />
          <Outlet />
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Layout;
