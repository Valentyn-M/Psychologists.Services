import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';
import s from './Menu.module.scss';
import clsx from 'clsx';
import { useAppSelector } from '@/store/hooks';
import { selectIsLoggedIn } from '@/store/auth/selectors';

export interface MenuProps {}

const Menu: React.FC<MenuProps> = ({}) => {
  const buildLinkClass: NavLinkProps['className'] = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className={s.navList}>
        <li>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/psychologists" className={buildLinkClass}>
            Psychologists
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/favorites" className={buildLinkClass}>
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
