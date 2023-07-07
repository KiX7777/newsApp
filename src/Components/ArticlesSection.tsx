import React from 'react';
import classes from './ArticlesSection.module.css';
import ArticleCard from './ArticleCard';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { getByCategory } from '../Store/thunks';
import { useEffect } from 'react';
import { Article } from '../models';
import { GridLoader } from 'react-spinners';
import PaginationBtns from './PaginationBtns';

const ArticlesSection = () => {
  const location = useLocation();
  const { pathname } = location;
  const pageName = pathname.slice(1);
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const loading = useAppSelector((state) => state.news.loading);
  const page = useAppSelector((state) => state.news.page);
  const error = useAppSelector((state) => state.news.error);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(getByCategory(pageName));
    }

    return () => {
      ignore = true;
    };
  }, [dispatch, pageName, page]);

  const cards = articles.map((art: Article) => (
    <ArticleCard
      author={art.author}
      image={art.images[0]}
      section={art.section}
      title={art.title}
      key={art.id}
      id={art.id}
    />
  ));

  return (
    <section className={classes.articles}>
      <h3 className={classes.pageName}>{pageName}</h3>
      <main className={classes.articleContainer}>
        {loading ? (
          <GridLoader color='#BB1E1E' className={classes.loader} />
        ) : !error ? (
          cards
        ) : (
          <h1>{error}</h1>
        )}
      </main>
      {!loading && <PaginationBtns />}
    </section>
  );
};

export default ArticlesSection;
