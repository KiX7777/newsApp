import React, { useRef } from 'react';
import finder from '../assets/Search.svg';
import classes from './SearchForm.module.css';
import { useAppDispatch } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const navigate = useNavigate();
  const searchref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  // const {
  //   isLoading,
  //   data,
  //   error: err,
  // } = useQuery({
  //   queryKey: ['search'],
  //   queryFn: () => {
  //     return getSearch();
  //   },
  // });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchref.current?.value;
    if (query) {
      dispatch(newsActions.setPage(1));
      navigate(`search/${query}`);
      searchref.current.value = '';
    }
  };
  return (
    <form action='' onSubmit={handleSubmit}>
      <img src={finder} alt='search icon' />
      <input ref={searchref} type='text' placeholder='Search news' />
      <button className={classes.searchBtn}>SEARCH</button>
    </form>
  );
};

export default SearchForm;
