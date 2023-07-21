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
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

const ArticlesSection = () => {
  const location = useLocation();
  const { pathname } = location;
  const pageName = pathname.slice(1);
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const loading = useAppSelector((state) => state.news.loading);
  const page = useAppSelector((state) => state.news.page);
  const error = useAppSelector((state) => state.news.error);

  const getData = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${pageName}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'x-api-key': 'a32a159ec4bf4ba9ad86a81b74194867',
          },
        }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await res.json();

      const articles = data.articles.map((art: Record<string, any>) => {
        const article: Article = {
          url: art.url,
          abstract: art.description,
          date: art.publishedAt,
          author: art.author,

          id: uuidv4(),
          images: [art.urlToImage],
          section: pageName,
          title: art.title,
        };
        return article;
      });

      const totalPages = Math.ceil(data.totalResults / 20);
      return {
        articles: articles,
        totalPages: totalPages,
      };
    } catch (err) {
      const error = err as Error;
      console.log(error);
    }
  };

  const {
    isLoading,
    status,
    error: err,
    data: arts,
  } = useQuery({
    queryKey: ['articles', pageName],
    queryFn: getData,
    staleTime: 60 * 1000 * 5 /* 5m */,
  });

  // useEffect(() => {
  //   let ignore = false;
  //   if (!ignore) {
  //     // dispatch(getByCategory(pageName));
  //   }

  //   return () => {
  //     ignore = true;
  //   };
  // }, [dispatch, pageName, page]);

  let cards;

  cards = arts?.articles.map((art: Article) => (
    <ArticleCard
      author={art.author}
      image={art.images[0]}
      section={art.section}
      title={art.title}
      key={art.id}
      id={art.id}
    />
  ));

  if (isLoading) {
    return <GridLoader color='#BB1E1E' className={classes.loader} />;
  }
  if (err) {
    if (err instanceof Error) return <h1>{err.message}</h1>;
  }

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
