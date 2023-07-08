import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { Article } from '../models';
import classes from './ArticlePage.module.css';
import { newsActions } from '../Store/newsSlice';
import FavoritesIcon from '../assets/icons/FavoritesIcon';
import LinkIcon from '../assets/icons/LinkIcon';

const ArticlePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useLocation().pathname.slice(9);
  const favorites = useAppSelector((state) => state.news.favorites);
  const articles = useAppSelector((state) => state.news.articles);
  const latestCards = useAppSelector((state) => state.news.latestNewsArticles);
  const isFav = favorites.find((fav) => fav.id === id);

  let article: Article;
  article = articles.find((art: Article) => art.id === id) as Article;
  if (!article) {
    article = favorites.find((art: Article) => art.id === id) as Article;
    if (!article) {
      article = latestCards.find((art: Article) => art.id === id) as Article;
    }
  }
  const handleFav = () => {
    if (isFav) {
      const inArt = articles.find(
        (art: Article) => art.id === isFav.id
      ) as Article;
      if (!inArt) {
        navigate('/favorites');
        dispatch(newsActions.removeFav(article.id));
      }
      dispatch(newsActions.removeFav(article.id));
    } else {
      dispatch(newsActions.addFav(article));
    }
  };

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <div className={classes.mainInfo}>
          <h1>{article.title}</h1>
          <small>{`${new Date(article.date).toLocaleDateString()}`}</small>
        </div>
        <div className={classes.btns}>
          <a rel='noreferrer' target='_blank' href={article.url}>
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
      <p>{article.abstract}</p>
      <div className={classes.image}>
        <img src={article.images[0]} alt='Article' />
      </div>
    </section>
  );
};

export default ArticlePage;
