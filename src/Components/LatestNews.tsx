import React from 'react';
import classes from './LatestNews.module.css';
import topicon from '../assets/top.svg';
import righticon from '../assets/right.svg';
import { useAppSelector } from '../Store/store';
import { useCallback, useRef } from 'react';
import LatestCard from './LatestCard';

import { useInfiniteQuery } from '@tanstack/react-query';
import { infiniteQuery } from '../service/infiniteQuery';
import { GridLoader } from 'react-spinners';

const LatestNews = () => {
  const isActive = useAppSelector((state) => state.news.homepageOption) === 'LATEST';

  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['infinite'],
      queryFn: ({ pageParam = 1 }) => infiniteQuery(pageParam),
      staleTime: 60 * 1000 * 5,
      getNextPageParam: (lastPage) => {
        if (lastPage?.hasMore) {
          return lastPage.next;
        }
        return undefined;
      },
    });

  const intObserver = useRef<IntersectionObserver>();

  const lastArticleRef = useCallback(
    (article: HTMLAnchorElement) => {
      if (isFetchingNextPage) {
        return;
      }

      if (intObserver.current) {
        intObserver.current.disconnect();
      }

      intObserver.current = new IntersectionObserver(
        (articles) => {
          if (articles[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1 },
      );
      if (article) intObserver.current.observe(article);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  // const handleObserver: IntersectionObserverCallback = useCallback(
  //   (entries) => {
  //     const target = entries[0];
  //     console.log(target);
  //     if (target.isIntersecting && hasNextPage) {
  //       console.log('intersecting');
  //       // dispatch(newsActions.incrementInfinitePage());
  //       fetchNextPage();
  //     }
  //   },
  //   [fetchNextPage, hasNextPage]
  // );
  // useEffect(() => {
  //   if (cardref.current) {
  //     observer.current = new IntersectionObserver(handleObserver, {
  //       threshold: 1,
  //     });
  //     observer.current.observe(cardref.current);
  //   }

  //   return () => {
  //     if (observer.current) {
  //       observer.current.disconnect();
  //     }
  //   };
  // }, [latestArticles, handleObserver]);

  let cards;
  let articles: any[] = [];

  data?.pages.forEach((page) => {
    const arts = page?.articles;
    articles = [...articles, ...arts!];
  });

  if (isLoading) {
    return <GridLoader />;
  }
  if (error && error instanceof Error) return <h1>{error.message}</h1>;

  console.log(articles);

  cards = articles.map((art, idx) => {
    if (articles.length === idx + 1) {
      return (
        <LatestCard
          ref={lastArticleRef}
          time={art.date}
          title={art.title}
          key={art.id}
          url={art.url}
        />
      );
    } else {
      return <LatestCard time={art.date} title={art.title} key={art.id} url={art.url} />;
    }
  });

  return (
    <aside className={isActive ? `${classes.container} ${classes.active}` : `${classes.container}`}>
      <div className={classes.title}>
        <img src={topicon} alt='alert icon for latest news' />
        <p>Latest news</p>
      </div>
      <div className={classes.cardsContainer}>{cards}</div>
      <div className={classes.ctaContainer}>
        <a href='/'>See all news</a>
        <img src={righticon} alt='right chevron' />
        {isFetchingNextPage && <p>Loading...</p>}{' '}
      </div>
    </aside>
  );
};

export default LatestNews;
