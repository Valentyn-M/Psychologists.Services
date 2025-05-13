import React from 'react';
import s from './AppBar.module.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = ({}) => {
  return (
    <div className={clsx(s.appBarWrap, 'container')}>
      <NavLink to="/" className={s.logo}>
        <span className="brand-color">psychologists</span>.services
      </NavLink>
    </div>
  );
};

export default AppBar;
