import React from 'react';
import classes from './ArticleCard.module.css';
import pic from '../assets/trump.png';
import FavoritesTabIcon from './FavoritesTabIcon';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
const ArticleCard = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.news);
  const isFav = state.favorites.find((fav) => fav === 'test');
  const handleFav = () => {
    isFav
      ? dispatch(newsActions.removeFav('test'))
      : dispatch(newsActions.addFav('test'));
  };

  return (
    <div className={classes.card}>
      <div className={classes.photo}>
        <img src={pic} alt='trump' />
      </div>
      <div className={classes.info}>
        <div className={classes.title}>
          <small>Sport</small>
          <h3 className={classes.headline}>Fta Keys</h3>
        </div>
        <p className={classes.author}>Bertie Campbell</p>
      </div>
      <button onClick={handleFav}>
        <FavoritesTabIcon />
      </button>
    </div>
  );
};

export default ArticleCard;
