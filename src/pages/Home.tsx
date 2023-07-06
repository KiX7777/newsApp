import React from 'react';
import classes from './Home.module.css';
import ArticleCard from '../Components/ArticleCard';
import LatestNews from '../Components/LatestNews';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { useEffect } from 'react';
import { getNYFeatured } from '../Store/thunks';
import { GridLoader } from 'react-spinners';
import { Article } from '../models';
import { newsActions } from '../Store/newsSlice';

const Home = () => {
  const activeTab = useAppSelector((state) => state.news.homepageOption);
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const loading = useAppSelector((state) => state.news.loading);
  const option = useAppSelector((state) => state.news.homepageOption);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(getNYFeatured());
    }
    return () => {
      ignore = true;
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(newsActions.resetInfinite());
  }, [dispatch]);

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
    <section>
      <h3 className={classes.news}>News</h3>
      <main className={classes.articleContainer}>
        {loading ? (
          <GridLoader color='#BB1E1E' className={classes.loader} />
        ) : option === 'FEATURED' ? (
          cards
        ) : null}

        <LatestNews />
      </main>
    </section>
  );
};

export default Home;
