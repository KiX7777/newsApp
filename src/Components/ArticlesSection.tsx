import React from 'react';
import classes from './ArticlesSection.module.css';
import ArticleCard from './ArticleCard';
import { useLocation } from 'react-router-dom';

const ArticlesSection = () => {
  const location = useLocation();
  const { pathname } = location;
  const pageName = pathname.slice(1);

  // ON LOAD GET CARDS FROM STATE AND CREATE CARDS AND RENDER THEM

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
      <h3 className={classes.pageName}>{pageName}</h3>
      <main className={classes.articleContainer}>{cards}</main>
    </section>
  );
};

export default ArticlesSection;
