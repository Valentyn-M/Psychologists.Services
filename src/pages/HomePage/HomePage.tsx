import Hero from '@/components/Hero/Hero';
import { Meta, Title } from 'react-head';
import { useEffect } from 'react';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  useEffect(() => {
    document.body.classList.add('home-page');

    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <>
      <Title>Psychologists | Home</Title>
      <Meta name="description" content="Find your psychologist online" />
      <Hero />
    </>
  );
};

export default HomePage;
