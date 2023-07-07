import { useAppDispatch, useAppSelector } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
import classes from './PaginationBtns.module.css';

const PaginationBtns = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.news.page);
  const hasMore = useAppSelector((state) => state.news.hasMore);

  const handlePlus = () => {
    dispatch(newsActions.incrementPage());
  };
  const handleMinus = () => {
    dispatch(newsActions.decrementPage());
  };
  return (
    <div className={classes.btns}>
      {page > 1 && (
        <button className={classes.btn} onClick={handleMinus}>
          Prev
        </button>
      )}
      {hasMore && (
        <button className={classes.btn} onClick={handlePlus}>
          Next
        </button>
      )}
    </div>
  );
};

export default PaginationBtns;
