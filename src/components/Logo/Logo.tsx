import { NavLink } from 'react-router-dom';
import s from './Logo.module.scss';

export interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <NavLink to="/" className={s.logo}>
      <span className="brand-color">psychologists</span>
      <span className={s.dot}>.</span>
      <span className={s.services}>services</span>
    </NavLink>
  );
};

export default Logo;
