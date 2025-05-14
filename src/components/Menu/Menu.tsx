import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Menu.module.scss';

export interface MenuProps {}

const Menu: React.FC<MenuProps> = ({}) => {
  return (
    <nav>
      <ul className={s.navList}>
        <li>
          <NavLink to="/" className={s.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/psychologists" className={s.link}>
            Psychologists
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={s.link}>
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
