import classes from './ArticlesSection.module.css';
import ArticleCard from './ArticleCard';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../Store/store';

import { GridLoader } from 'react-spinners';
import PaginationBtns from './PaginationBtns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getData } from '../service/categoryNews';

const ArticlesSection = () => {
  const location = useLocation();
  const { pathname } = location;
  const pageName = pathname.slice(1);
  const loading = useAppSelector((state) => state.news.loading);
  const page = useAppSelector((state) => state.news.page);
  const error = useAppSelector((state) => state.news.error);
  const queryClient = useQueryClient();

  const preFetch = (page: number) => {
    queryClient.prefetchQuery({
      queryKey: ['articles', pageName, page],
      queryFn: () => getData(page, pageName),
      staleTime: 60 * 1000 * 5 /* 5m */,
    });
  };

  const {
    isLoading,

    error: err,
    data,
  } = useQuery({
    queryKey: ['articles', pageName, page],
    queryFn: () => getData(page, pageName),
    staleTime: 60 * 1000 * 5 /* 5m */,
    keepPreviousData: true,
  });
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
      {!isLoading && (
        <PaginationBtns hasMore={data?.hasMore ?? false} prefetch={preFetch} />
      )}
    </section>
  );
};

export default ArticlesSection;
