import React from 'react';
import classes from './Search.module.css';

import ArticleCard from '../Components/ArticleCard';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { useEffect } from 'react';
import { GridLoader } from 'react-spinners';
import { Article } from '../models';
import { useLocation } from 'react-router-dom';
import PaginationBtns from '../Components/PaginationBtns';
import { getSearch } from '../Store/thunks';

const Search = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const loading = useAppSelector((state) => state.news.loading);
  const page = useAppSelector((state) => state.news.page);
  const searchParam = useLocation().pathname.slice(8);
  const error = useAppSelector((state) => state.news.error);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      dispatch(getSearch(searchParam));
    }

    return () => {
      ignore = true;
    };
  }, [dispatch, page, searchParam]);

  const cards = articles.map((art: Article) => (
    <ArticleCard
      key={art.id}
      author={art.author}
      section={art.section}
      title={art.title}
      image={art.images[0]}
      id={art.id}
    />
  ));

  return (
    <section className={classes.search}>
      <h3 className={classes.news}>Search results for "{searchParam}"</h3>
      <main className={classes.articleContainer}>
        {loading ? (
          <GridLoader color='#BB1E1E' className={classes.loader} />
        ) : !error ? (
          articles.length > 0 ? (
            !error && cards
          ) : (
            <h1>No results found</h1>
          )
        ) : (
          <h1>{error}</h1>
        )}
      </main>
      {!loading && <PaginationBtns />}
    </section>
  );
};

export default Search;
