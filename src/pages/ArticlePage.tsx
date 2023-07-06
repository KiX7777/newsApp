import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { Article } from '../models';
import classes from './ArticlePage.module.css';
import { newsActions } from '../Store/newsSlice';
import FavoritesIcon from '../Components/FavoritesIcon';
import LinkIcon from '../Components/LinkIcon';

const ArticlePage = () => {
  const dispatch = useAppDispatch();
  const id = useLocation().pathname.slice(9);
  const favorites = useAppSelector((state) => state.news.favorites);
  const isFav = favorites.find((fav) => fav.id === id);
  const handleFav = () => {
    isFav
      ? dispatch(newsActions.removeFav('test'))
      : dispatch(newsActions.addFav(article));
  };

  const articles = useAppSelector((state) => state.news.articles);
  const article = articles.find((art: Article) => art.id === id) as Article;

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
      <img src={article.images[0]} alt='Article' />
    </section>
  );
};

export default ArticlePage;
