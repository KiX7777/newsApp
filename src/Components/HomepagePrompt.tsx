import classes from './HomepagePrompt.module.css';
import { useAppSelector, useAppDispatch } from '../Store/store';
import { newsActions } from '../Store/newsSlice';
import { useEffect, useRef } from 'react';
const HomepagePrompt = () => {
  const show = useAppSelector((state) => state.news.homepagePrompt);
  const dispatch = useAppDispatch();
  const promptRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    dispatch(newsActions.dismissPrompt());
  };

  const remove = () => {
    promptRef.current?.remove();
  };

  useEffect(() => {
    //remove from DOM after animation ends
    const prompt = promptRef.current;
    prompt?.addEventListener('animationend', remove);
    return () => {
      prompt?.removeEventListener('animationend', remove);
    };
  }, []);

  return (
    <>
      <div
        ref={promptRef}
        className={
          show ? `${classes.prompt}` : `${classes.prompt} ${classes.dismiss}`
        }
      >
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
