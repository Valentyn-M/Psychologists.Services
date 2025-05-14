import React from 'react';
import { Meta, Title } from 'react-head';
import Hero from '../../components/Hero/Hero';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <>
      <Title>Psychologists | Home</Title>
      <Meta name="description" content="Find your psychologist online" />
      <Hero />
    </>
  );
};

export default HomePage;
