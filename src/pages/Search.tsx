import React from 'react';
import classes from './Search.module.css';

import ArticleCard from '../Components/ArticleCard';
import { useAppSelector } from '../Store/store';
import { GridLoader } from 'react-spinners';
import { Navigate, useLocation } from 'react-router-dom';
import PaginationBtns from '../Components/PaginationBtns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSearch } from '../service/search';

const Search = () => {
  const loading = useAppSelector((state) => state.news.loading);
  const page = useAppSelector((state) => state.news.page);
  const searchParam = useLocation().pathname.slice(8);
  const error = useAppSelector((state) => state.news.error);
  const queryClient = useQueryClient();

  const {
    isLoading,
    data,
    error: err,
  } = useQuery({
    queryKey: ['search', searchParam, page],
    staleTime: 3_600_000,
    queryFn: () => {
      return getSearch(searchParam, page);
    },
  });
  const preFetch = (page: number) => {
    queryClient.prefetchQuery({
      queryKey: ['search', searchParam, page],
      queryFn: () => {
        return getSearch(searchParam, page);
      },
      staleTime: 60 * 1000 * 5 /* 5m */,
    });
  };
  let cards;

  cards = data?.articles.map((art: any) => (
    <ArticleCard
      key={art.id}
      author={art.author}
      section={art.section}
      title={art.title}
      image={`http://www.nytimes.com/${art?.images}`}
      uri={art.uri}
      id={art.id}
    />
  ));

  if (isLoading) {
    return <GridLoader color='#BB1E1E' className={classes.loader} />;
  }
  if (err) {
    if (err instanceof Error) return <Navigate to='/' />;
  }

  return (
    <section className={classes.search}>
      <h3 className={classes.news}>Search results for "{searchParam}"</h3>
      <main className={classes.articleContainer}>
        {loading ? (
          <GridLoader color='#BB1E1E' className={classes.loader} />
        ) : !error ? (
          data?.articles.length > 0 ? (
            !error && cards
          ) : (
            <h1>No results found</h1>
          )
        ) : (
          <h1>{error}</h1>
        )}
      </main>
      {!loading && (
        <PaginationBtns hasMore={data?.hasMore!} prefetch={preFetch} />
      )}
    </section>
  );
};

export default Search;
