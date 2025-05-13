import './App.scss';
import React, { lazy } from 'react';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Psychologists = lazy(() => import('../pages/Psychologists/Psychologists'));
const Favorites = lazy(() => import('../pages/Favorites/Favorites'));

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<Psychologists />} />
        {/* TODO /favorites must be Private route */}
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  );
};

export default App;
