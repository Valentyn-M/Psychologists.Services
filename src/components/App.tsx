import './App.scss';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '@/components/PrivateRoute';
import Layout from '@/components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { refreshUser } from '@/store/auth/operations';
import { selectIsRefreshing } from '@/store/auth/selectors';

export const svgIcon = '/sprite.svg';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Psychologists = lazy(() => import('../pages/Psychologists/Psychologists'));
const Favorites = lazy(() => import('../pages/Favorites/Favorites'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isRefreshing = useAppSelector(selectIsRefreshing);

  return isRefreshing ? (
    // TODO <Loader />
    <p>Loading...</p>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        {/* TODO Add Styles to NotFoundPage */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
