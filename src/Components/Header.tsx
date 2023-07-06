import React from 'react';
import classes from './Header.module.css';
import hamburger from '../assets/hamburger.svg';
import SearchForm from './SearchForm';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.news);
  const handleOpen = (): void => {
    dispatch(newsActions.openMobileMenu());
  };

  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <Link to={'/'}>
          <span>My</span>News
        </Link>
        <button onClick={handleOpen} className={classes.hamburger}>
          <img src={hamburger} alt='menu toggle' />
        </button>
      </div>
      <SearchForm />
      <button
        onClick={() => {
          console.log(state);
        }}
      >
        STATE
      </button>
    </header>
  );
};

export default Header;
