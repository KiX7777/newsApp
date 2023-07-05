import React from 'react';
import classes from './HomepagePicker.module.css';

const HomepagePicker = () => {
  return (
    <div className={classes.mobilePicker}>
      <span className={`${classes.option} ${classes.active}`}>Featured</span>
      <span className={classes.option}>Latest</span>
    </div>
  );
};

export default HomepagePicker;
