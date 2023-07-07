import classes from './ArticleCard.module.css';
import fallbackImg from '../assets/noimg.svg.webp';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  author: string;
  title: string;
  section: string;
  image: string;
  id: string;
}

const ArticleCard = ({ author, title, section, image, id }: CardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.card}
      onClick={(): void => {
        navigate(`/article/${id}`);
      }}
    >
      <div className={classes.photo}>
        <img
          src={image}
          alt={title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg;
          }}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.title}>
          <small>{section}</small>
          <h3 className={classes.headline}>{title}</h3>
        </div>
        <p className={classes.author}>{author}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
