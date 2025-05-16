import AuthPanel from '@/components/AuthPanel/AuthPanel';
import UserPanel from '@/components/UserPanel/UserPanel';
import s from './AuthBar.module.scss';
import { useAppSelector } from '@/store/hooks';
import { selectIsLoggedIn } from '@/store/auth/selectors';

export interface AuthBarProps {}

const AuthBar: React.FC<AuthBarProps> = ({}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return <div className={s.authBar}>{isLoggedIn ? <UserPanel /> : <AuthPanel />}</div>;
};

export default AuthBar;
