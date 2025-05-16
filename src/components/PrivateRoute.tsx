import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsLoggedIn } from '@/store/auth/selectors';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // replace - безпечний редирект без залишку в історії браузера
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
