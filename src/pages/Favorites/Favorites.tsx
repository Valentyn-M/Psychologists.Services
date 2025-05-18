import FavoritesBlock from '@/components/FavoritesBlock/FavoritesBlock';
import React, { useEffect } from 'react';
import { Meta, Title } from 'react-head';

export interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = ({}) => {
  useEffect(() => {
    document.body.classList.add('favorites-page');

    return () => {
      document.body.classList.remove('favorites-page');
    };
  }, []);

  return (
    <>
      <Title>Favorites</Title>
      <Meta name="description" content="Your favorites psychologist" />
      <FavoritesBlock />
    </>
  );
};

export default Favorites;
