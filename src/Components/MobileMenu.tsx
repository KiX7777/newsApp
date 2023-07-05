import React from 'react';
import Sidebar from './Sidebar';
import classes from './MobileMenu.module.css';
import closemenu from '../assets/closemenu.svg';
import SearchForm from './SearchForm';
import { useAppSelector, useAppDispatch } from '../Store/store';
import { newsActions } from '../Store/newsSlice';

const MobileMenu = () => {
  const open = useAppSelector((state) => state.news.mobileMenuOpen);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(newsActions.closeMobileMenu());
  };

  return (
    <div
      className={
        open ? `${classes.mobileMenu} ${classes.open}` : `${classes.mobileMenu}`
      }
    >
      <button onClick={handleClose} className={classes.closeMenu}>
        <img src={closemenu} alt='close menu icon' />
      </button>
      <h2>
        <span>My</span>News
      </h2>
      <SearchForm />
      {open && <Sidebar />}
    </div>
  );
};

export default MobileMenu;
