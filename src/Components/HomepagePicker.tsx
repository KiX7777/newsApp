import React from 'react';
import classes from './HomepagePicker.module.css';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
const HomepagePicker = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.news.homepageOption);
  const handleClick = (option: 'FEATURED' | 'LATEST'): void => {
    dispatch(newsActions.setHomepageOption(option));
  };
  return (
    <div className={classes.mobilePicker}>
      <span
        onClick={() => {
          handleClick('FEATURED');
        }}
        className={
          activeTab === 'FEATURED'
            ? `${classes.option} ${classes.active}`
            : `${classes.option}`
        }
      >
        Featured
      </span>
      <span
        onClick={() => {
          handleClick('LATEST');
        }}
        className={
          activeTab === 'LATEST'
            ? `${classes.option} ${classes.active}`
            : `${classes.option}`
        }
      >
        Latest
      </span>
    </div>
  );
};

export default HomepagePicker;
