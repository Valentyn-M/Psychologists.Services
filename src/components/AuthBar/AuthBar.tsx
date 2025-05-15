import AuthPanel from '@/components/AuthPanel/AuthPanel';
import UserPanel from '@/components/UserPanel/UserPanel';
import s from './AuthBar.module.scss';

export interface AuthBarProps {}

const AuthBar: React.FC<AuthBarProps> = ({}) => {
  return (
    <div className={s.authBar}>
      {/* TODO {isLoggedIn ? <UserMenu /> : <AuthPanel />} */}
      <AuthPanel />
      {/* <UserPanel /> */}
    </div>
  );
};

export default AuthBar;
