import PsychologistsBlock from '@/components/PsychologistsBlock/PsychologistsBlock';
import React, { useEffect } from 'react';
import { Meta, Title } from 'react-head';

export interface PsychologistsProps {}

const Psychologists: React.FC<PsychologistsProps> = ({}) => {
  useEffect(() => {
    document.body.classList.add('psychologists-page');

    return () => {
      document.body.classList.remove('psychologists-page');
    };
  }, []);

  return (
    <>
      <Title>Psychologists</Title>
      <Meta name="description" content="Chose your psychologist" />
      <PsychologistsBlock />
    </>
  );
};

export default Psychologists;
