import React from 'react';
import classes from './Home.module.css';
import ArticleCard from '../Components/ArticleCard';
import LatestNews from '../Components/LatestNews';
import { useAppSelector } from '../Store/store';

const Home = () => {
  const activeTab = useAppSelector((state) => state.news.homepageOption);

  const cards = [
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
  ];
  return (
    <section>
      <h3 className={classes.news}>News</h3>
      <main className={classes.articleContainer}>
        {activeTab === 'FEATURED' && cards}
        <LatestNews />
      </main>
    </section>
  );
};

export default Home;
