import classes from './HomepagePrompt.module.css';
import { useAppDispatch } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
const HomepagePrompt = () => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(newsActions.dismissPrompt());
  };

  return (
    <>
      <div className={classes.prompt}>
        <div className={classes.container}>
          <div className={classes.promptTxt}>
            <h5>Make MyNews your homepage</h5>
            <p>Every day discover what’s trending on the internet!</p>
          </div>
          <div className={classes.buttons}>
            <button onClick={handleClick} className={classes.rejectBtn}>
              No, thanks
            </button>
            <button onClick={handleClick} className={classes.acceptBtn}>
              GET
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepagePrompt;
