import classes from './LatestCard.module.css';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  time: string;
  title: string;
  url: string;
}

const LatestCard = forwardRef<HTMLAnchorElement, CardProps>((props, ref) => {
  return (
    <Link
      ref={ref}
      className={classes.card}
      // onClick={(): void => {
      //   navigate(`${props.url}`);
      // }}
      to={props.url}
      target='_blank'
    >
      <small>{`${new Date(props.time).toLocaleTimeString()}`}</small>
      <h4>{props.title}</h4>
    </Link>
  );
});

export default LatestCard;
