import React from 'react';
import finder from '../assets/Search.svg';
import classes from './SearchForm.module.css';
const SearchForm = () => {
  return (
    <form action=''>
      <img src={finder} alt='search icon' />
      <input type='text' placeholder='Search news' />
      <button className={classes.searchBtn}>SEARCH</button>
    </form>
  );
};

export default SearchForm;
