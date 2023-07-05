import React from 'react';
import classes from './ArticleCard.module.css';
import pic from '../assets/trump.png';
const ArticleCard = () => {
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
    </div>
  );
};

export default ArticleCard;
