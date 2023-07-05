import React from 'react';
import classes from './Header.module.css';
import hamburger from '../assets/hamburger.svg';
import SearchForm from './SearchForm';
import { useAppDispatch } from '../Store/store';
import { newsActions } from '../Store/newsSlice';

const Header = () => {
  const dispatch = useAppDispatch();

  const handleOpen = (): void => {
    dispatch(newsActions.openMobileMenu());
  };

  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <h2>
          <span>My</span>News
        </h2>
        <button onClick={handleOpen} className={classes.hamburger}>
          <img src={hamburger} alt='menu toggle' />
        </button>
      </div>
      <SearchForm />
    </header>
  );
};

export default Header;