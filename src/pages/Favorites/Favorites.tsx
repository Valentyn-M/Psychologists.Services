import React from 'react';
import { Meta, Title } from 'react-head';

export interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = ({}) => {
  return (
    <section>
      <Title>Favorites</Title>
      <Meta name="description" content="Your favorites psychologist" />
      <h1>Favorites Page</h1>
    </section>
  );
};

export default Favorites;
