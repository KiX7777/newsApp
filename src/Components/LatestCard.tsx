import classes from './LatestCard.module.css';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  time: string;
  title: string;
  id: string;
}

const LatestCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const navigate = useNavigate();
  return (
    <div
      ref={ref}
      className={classes.card}
      onClick={(): void => {
        navigate(`/article/${props.id}`);
      }}
    >
      <small>{`${new Date(props.time).toLocaleTimeString()}`}</small>
      <h4>{props.title}</h4>
    </div>
  );
});

export default LatestCard;
