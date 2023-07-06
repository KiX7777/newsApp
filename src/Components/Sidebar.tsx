import React from 'react';
import classes from './Sidebar.module.css';

import { NavLink } from 'react-router-dom';
import HomeBtn from './HomeBtn';
import GeneralBtn from './GeneralBtn';
import BusinessBtn from './BusinessBtn';
import HealthBtn from './HealthBtn';
import ScienceBtn from './ScienceBtn';
import SportsBtn from './SportsBtn';
import TechBtn from './TechBtn';
import { useAppDispatch, useAppSelector } from '../Store/store';
import FavoritesTabIcon from './FavoritesTabIcon';
import { newsActions } from '../Store/newsSlice';

const Sidebar = () => {
  const show = useAppSelector((state) => state.news.mobileMenuOpen);
  const isMobileOpen = useAppSelector((state) => state.news.mobileMenuOpen);
  const favs = useAppSelector((state) => state.news.favorites);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (isMobileOpen) {
      dispatch(newsActions.closeMobileMenu());
      // dispatch(newsActions)
    }
    dispatch(newsActions.setPage(1));
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
        to={'/general'}
        onClick={handleClick}
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
      >
        <GeneralBtn />
        General
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
      {favs.length > 0 && (
        <NavLink
          onClick={handleClick}
          to={'/favorites'}
          className={({ isActive }) =>
            isActive
              ? `${classes.active} ${classes.navBtn}`
              : `${classes.navBtn}`
          }
        >
          <FavoritesTabIcon />
          Favorites
        </NavLink>
      )}
    </nav>
  );
};

export default Sidebar;
