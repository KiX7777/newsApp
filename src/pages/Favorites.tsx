import React from 'react';
import classes from './Favorites.module.css';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { Article } from '../models';
import { GridLoader } from 'react-spinners';
import ArticleCard from '../Components/ArticleCard';
import PaginationBtns from '../Components/PaginationBtns';
import { Navigate } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useAppDispatch();
  let favorites;
  favorites = useAppSelector((state) => state.news.favorites);
  const loading = useAppSelector((state) => state.news.loading);

  const cards = favorites.map((art: Article) => (
    <ArticleCard
      key={art.id}
      author={art.author}
      section={art.section}
      title={art.title}
      image={art.images[0]}
      id={art.id}
    />
  ));

  return favorites.length < 1 ? (
    <Navigate to={'/'} />
  ) : (
    <section className={classes.favorites}>
      <h3 className={classes.news}>Favorites</h3>
      <main className={classes.articleContainer}>
        {loading ? (
          <GridLoader color='#BB1E1E' className={classes.loader} />
        ) : favorites.length > 0 ? (
          cards
        ) : (
          <h1 className={classes.notification}>No favorites added</h1>
        )}
      </main>
    </section>
  );
};

export default Favorites;
