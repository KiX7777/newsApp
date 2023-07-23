import classes from './Sidebar.module.css';

import { NavLink } from 'react-router-dom';
import HomeBtn from '../assets/icons/HomeBtn';
import EnterIcon from '../assets/icons/GeneralBtn';
import BusinessBtn from '../assets/icons/BusinessBtn';
import HealthBtn from '../assets/icons/HealthBtn';
import ScienceBtn from '../assets/icons/ScienceBtn';
import SportsBtn from '../assets/icons/SportsBtn';
import TechBtn from '../assets/icons/TechBtn';
import { useAppDispatch, useAppSelector } from '../Store/store';
import FavoritesTabIcon from '../assets/icons/FavoritesTabIcon';
import { newsActions } from '../Store/newsSlice';

const Sidebar = () => {
  const show = useAppSelector((state) => state.news.mobileMenuOpen);
  const isMobileOpen = useAppSelector((state) => state.news.mobileMenuOpen);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (isMobileOpen) {
      dispatch(newsActions.closeMobileMenu());
    }
    dispatch(newsActions.setPage(1));
    dispatch(newsActions.resetInfinite());
  };

  return (
    <nav
      className={
        show ? `${classes.mobile} ${classes.sidebar}` : `${classes.sidebar}`
      }
    >
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/home'}
      >
        <HomeBtn />
        Home
      </NavLink>
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/business'}
      >
        <BusinessBtn />
        Business
      </NavLink>
      <NavLink
        to={'/education'}
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
      >
        <EnterIcon />
        Education
      </NavLink>
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/health'}
      >
        <HealthBtn />
        Health
      </NavLink>
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/science'}
      >
        <ScienceBtn />
        Science
      </NavLink>
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/sports'}
      >
        <SportsBtn />
        Sports
      </NavLink>
      <NavLink
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/technology'}
      >
        <TechBtn />
        Technology
      </NavLink>

      <NavLink
        onClick={handleClick}
        to={'/favorites'}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
      >
        <FavoritesTabIcon />
        Favorites
      </NavLink>
    </nav>
  );
};

export default Sidebar;
