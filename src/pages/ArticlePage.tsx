import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/store';
import classes from './ArticlePage.module.css';
import { newsActions } from '../Store/newsSlice';
import FavoritesIcon from '../assets/icons/FavoritesIcon';
import LinkIcon from '../assets/icons/LinkIcon';
import { useQuery } from '@tanstack/react-query';
import { getNYArticle } from '../service/NYArticle';
import { GridLoader } from 'react-spinners';
import Back from '../assets/icons/Back';

const ArticlePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const favorites = useAppSelector((state) => state.news.favorites);
  const id = location.pathname.slice(9);

  const {
    isLoading,
    error,
    data: article,
  } = useQuery({
    queryKey: ['articles', id],
    staleTime: 86400000,
    queryFn: () => {
      return getNYArticle(id);
    },
  });
  const isFav = favorites.find((art) => art.url === article?.url);

  // return <h1></h1>;
  // let article: Article;
  // article = articles.find((art: Article) => art.id === id) as Article;
  // if (!article) {
  //   article = favorites.find((art: Article) => art.id === id) as Article;
  //   if (!article) {
  //     article = latestCards.find((art: Article) => art.id === id) as Article;
  //   }
  // }
  // const handleFav = () => {
  //   if (isFav) {
  //     const inArt = articles.find(
  //       (art: Article) => art.id === isFav.id
  //     ) as Article;
  //     if (!inArt) {
  //       navigate('/favorites');
  //       dispatch(newsActions.removeFav(article.id));
  //     }
  //     dispatch(newsActions.removeFav(article.id));
  //   } else {
  //     dispatch(newsActions.addFav(article));
  //   }
  // };
  const handleFav = () => {
    isFav
      ? dispatch(newsActions.removeFav(article!.id))
      : dispatch(newsActions.addFav(article!));
  };

  if (isLoading) {
    return <GridLoader color='#BB1E1E' className={classes.loader} />;
  }
  if (error && error instanceof Error) return <h1>{error.message}</h1>;

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <button
          className={classes.back}
          onClick={() => {
            navigate(-2);
          }}
        >
          <Back />
        </button>
        <div className={classes.mainInfo}>
          <h1>{article?.title}</h1>
          <small>{`${new Date(article!.date).toLocaleDateString()}`}</small>
        </div>
        <div className={classes.btns}>
          <a rel='noreferrer' target='_blank' href={article?.url}>
            <LinkIcon />
          </a>
          <button
            className={
              isFav ? `${classes.fav} ${classes.add}` : `${classes.fav}`
            }
            onClick={handleFav}
          >
            <FavoritesIcon />
          </button>
        </div>
      </header>
      <p>{article?.abstract}</p>
      <div className={classes.image}>
        <img src={`http://www.nytimes.com/${article?.images}`} alt='Article' />
      </div>
    </section>
  );
};

export default ArticlePage;
