import { useAppDispatch, useAppSelector } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
import classes from './PaginationBtns.module.css';

const PaginationBtns = ({
  hasMore,
  prefetch,
}: {
  hasMore: boolean;
  prefetch?: (page: number) => void;
}) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.news.page);

  const handlePlus = () => {
    dispatch(newsActions.incrementPage());
  };
  const handleMinus = () => {
    dispatch(newsActions.decrementPage());
  };
  return (
    <div className={classes.btns}>
      {page > 1 && (
        <button
          className={classes.btn}
          onClick={handleMinus}
          onMouseOver={() => {
            if (prefetch) prefetch(page - 1);
          }}
        >
          Prev
        </button>
      )}
      {hasMore && (
        <button
          className={classes.btn}
          onClick={handlePlus}
          onMouseOver={() => {
            if (prefetch) prefetch(page + 1);
          }}
        >
          Next
        </button>
      )}{' '}
    </div>
  );
};

export default PaginationBtns;
