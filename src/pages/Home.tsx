import classes from './Home.module.css';
import ArticleCard from '../Components/ArticleCard';
import LatestNews from '../Components/LatestNews';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { useEffect } from 'react';
import { GridLoader } from 'react-spinners';
import { newsActions } from '../Store/newsSlice';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../service/NYTimes';

const Home = () => {
  const dispatch = useAppDispatch();
  // const articles = useAppSelector((state) => state.news.articles);
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
    queryFn: getData,

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

  cards = arts?.map((art: any) => (
    <ArticleCard
      key={art.id}
      author={art.author}
      section={art.section}
      title={art.title}
      image={art.images[0]}
      uri={art.uri}
      id={art.id}
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
        {/* <LatestNews /> */}
      </main>
    </section>
  );
};

export default Home;
