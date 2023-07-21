import React from 'react';
import classes from './LatestNews.module.css';
import topicon from '../assets/top.svg';
import righticon from '../assets/right.svg';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { useEffect, useCallback, useRef } from 'react';
import LatestCard from './LatestCard';
import { getLatest } from '../Store/thunks';
import { newsActions } from '../Store/newsSlice';
import { useInfiniteQuery } from '@tanstack/react-query';

const LatestNews = () => {
  const dispatch = useAppDispatch();
  const isActive =
    useAppSelector((state) => state.news.homepageOption) === 'LATEST';
  const latestArticles = useAppSelector(
    (state) => state.news.latestNewsArticles
  );
  const page = useAppSelector((state) => state.news.infiniteScrollPage);
  const hasMore = useAppSelector((state) => state.news.infiniteHasMore);
  const observer = useRef<IntersectionObserver | null>(null);
  const cardref = useRef<HTMLDivElement>(null);
  const loading = useAppSelector((state) => state.news.infiniteLoading);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        dispatch(newsActions.incrementInfinitePage());
      }
    },
    [dispatch, hasMore]
  );
  useEffect(() => {
    if (cardref.current) {
      observer.current = new IntersectionObserver(handleObserver, {
        threshold: 1,
      });
      observer.current.observe(cardref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [latestArticles, handleObserver]);

  const cards = latestArticles.map((art, idx) => {
    if (latestArticles.length === idx + 1) {
      return (
        <LatestCard
          ref={cardref}
          time={art.date}
          title={art.title}
          key={art.id}
          id={art.id}
        />
      );
    } else {
      return (
        <LatestCard
          time={art.date}
          title={art.title}
          key={art.id}
          id={art.id}
        />
      );
    }
  });

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(getLatest());
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, page]);

  return (
    <aside
      className={
        isActive
          ? `${classes.container} ${classes.active}`
          : `${classes.container}`
      }
    >
      <div className={classes.title}>
        <img src={topicon} alt='alert icon for latest news' />
        <p>Latest news</p>
      </div>
      <div className={classes.cardsContainer}>{cards}</div>
      <div className={classes.ctaContainer}>
        <a href='/'>See all news</a>
        <img src={righticon} alt='right chevron' />
        {loading && <p>Loading...</p>}{' '}
      </div>
    </aside>
  );
};

export default LatestNews;
