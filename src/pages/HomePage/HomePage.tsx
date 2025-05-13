import React from 'react';
import { Meta, Title } from 'react-head';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <section>
      <Title>Psychologists | Home</Title>
      <Meta name="description" content="Find your psychologist online" />
      <h1>Home Page</h1>
    </section>
  );
};

export default HomePage;
