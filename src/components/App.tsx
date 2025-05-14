import './App.scss';
import { lazy } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';

export const svgIcon = '/sprite.svg';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Psychologists = lazy(() => import('../pages/Psychologists/Psychologists'));
const Favorites = lazy(() => import('../pages/Favorites/Favorites'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<Psychologists />} />
        {/* TODO /favorites must be Private route */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
