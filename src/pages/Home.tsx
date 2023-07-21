import classes from './Home.module.css';
import ArticleCard from '../Components/ArticleCard';
import LatestNews from '../Components/LatestNews';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { useEffect } from 'react';
import { getNYFeatured } from '../Store/thunks';
import { GridLoader } from 'react-spinners';
import { Article } from '../models';
import { newsActions } from '../Store/newsSlice';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.news.articles);
  const loading = useAppSelector((state) => state.news.loading);
  const option = useAppSelector((state) => state.news.homepageOption);
  const error = useAppSelector((state) => state.news.error);

  const {
    isLoading,
    error: err,
    data: arts,
  } = useQuery({
    queryKey: ['articles'],
    staleTime: 60 * 1000 * 5 /* 5m */,
    queryFn: async () => {
      const res = await fetch(
        'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4'
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }

      return res.json();
    },

    onSuccess: () => {
      console.log('ok');
    },
    onError: () => {
      console.log(err);
    },
  });

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(getNYFeatured());
      dispatch(newsActions.setPage(1));
    }
    return () => {
      ignore = true;
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(newsActions.resetInfinite());
  }, [dispatch]);

  let cards;

  // if (articles) {
  //   cards = articles.map((art: Article) => (
  //     <ArticleCard
  //       key={art.id}
  //       author={art.author}
  //       section={art.section}
  //       title={art.title}
  //       image={art.images[0]}
  //       id={art.id}
  //     />
  //   ));
  // }

  cards = arts?.results?.map((art: any) => (
    <ArticleCard
      key={art.updated_date + art.byline}
      author={art.byline}
      section={art.section}
      title={art.title}
      image={art.multimedia[0].url}
      id={art.updated_date}
    />
  ));

  if (isLoading) {
    return <GridLoader color='#BB1E1E' className={classes.loader} />;
  }
  if (err) {
    return <p>Error</p>;
  }

  return (
    <section className={classes.home}>
      <h3 className={classes.news}>News</h3>

      <main className={classes.articleContainer}>
        {loading ? (
          <GridLoader color='#BB1E1E' className={classes.loader} />
        ) : option === 'FEATURED' ? (
          cards
        ) : null}
        {error && <h1>{error}</h1>}
        <LatestNews />
      </main>
    </section>
  );
};

export default Home;
