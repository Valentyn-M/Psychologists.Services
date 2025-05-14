import s from './AppBar.module.scss';
import clsx from 'clsx';

import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import AuthBar from '../AuthBar/AuthBar';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = ({}) => {
  return (
    <div className={clsx(s.appBarWrap, 'container')}>
      <Logo />
      <Menu />
      <AuthBar />
    </div>
  );
};

export default AppBar;
