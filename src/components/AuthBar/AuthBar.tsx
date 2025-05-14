import AuthPanel from '@/components/AuthPanel/AuthPanel';
import UserPanel from '@/components/UserPanel/UserPanel';

export interface AuthBarProps {}

const AuthBar: React.FC<AuthBarProps> = ({}) => {
  return (
    <div>
      {/* TODO {isLoggedIn ? <UserMenu /> : <AuthPanel />} */}
      <AuthPanel />
      {/* <UserPanel /> */}
    </div>
  );
};

export default AuthBar;
