import React from 'react';
import { Meta, Title } from 'react-head';

export interface PsychologistsProps {}

const Psychologists: React.FC<PsychologistsProps> = ({}) => {
  return (
    <section>
      <Title>Psychologists</Title>
      <Meta name="description" content="Chose your psychologist" />
      <h1>Psychologists Page</h1>
    </section>
  );
};

export default Psychologists;
