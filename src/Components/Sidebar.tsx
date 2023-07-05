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
import { useAppSelector } from '../Store/store';
import FavoritesTabIcon from './FavoritesTabIcon';

const Sidebar = () => {
  const show = useAppSelector((state) => state.news.mobileMenuOpen);

  return (
    <nav
      className={
        show ? `${classes.mobile} ${classes.sidebar}` : `${classes.sidebar}`
      }
    >
      <NavLink
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
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
      >
        <GeneralBtn />
        General
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/business'}
      >
        <BusinessBtn />
        Business
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/health'}
      >
        <HealthBtn />
        Health
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/science'}
      >
        <ScienceBtn />
        Science
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/sports'}
      >
        <SportsBtn />
        Sports
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.active} ${classes.navBtn}` : `${classes.navBtn}`
        }
        to={'/technology'}
      >
        <TechBtn />
        Technology
      </NavLink>
      <NavLink
        to={''}
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
