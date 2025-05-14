import React from 'react';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';

export interface AuthBarProps {}

const AuthBar: React.FC<AuthBarProps> = ({}) => {
  return (
    <div>
      {/* TODO {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
      <AuthNav />
      <UserMenu />
    </div>
  );
};

export default AuthBar;
