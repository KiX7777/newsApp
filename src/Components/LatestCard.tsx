import React, { LegacyRef } from 'react';
import classes from './LatestCard.module.css';
import { forwardRef } from 'react';

interface CardProps {
  time: string;
  title: string;
}

const LatestCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <div ref={ref} className={classes.card}>
      <small>{`${new Date(props.time).toLocaleTimeString()}`}</small>
      <h4>{props.title}</h4>
    </div>
  );
});

export default LatestCard;
