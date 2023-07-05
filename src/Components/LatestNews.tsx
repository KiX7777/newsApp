import React from 'react';
import classes from './LatestNews.module.css';
import topicon from '../assets/top.svg';
import righticon from '../assets/right.svg';

const LatestNews = () => {
  return (
    <aside className={classes.container}>
      <div className={classes.title}>
        <img src={topicon} alt='alert icon for latest news' />
        <p>Latest news</p>
      </div>
      <div className={classes.cardsContainer}>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>
            6 Powerful Tips To Creating Testimonials That Sell Your Products
          </h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
        <div className={classes.newsCard}>
          <small>14:30</small>
          <h4>How To Write Better Advertising Copy</h4>
        </div>
      </div>
      <div className={classes.ctaContainer}>
        <a href='#'>See all news</a>
        <img src={righticon} alt='right chevron' />
      </div>
    </aside>
  );
};

export default LatestNews;
