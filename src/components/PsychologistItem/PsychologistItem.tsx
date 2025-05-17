import s from './PsychologistItem.module.scss';

export interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface Psychologist {
  about: string;
  avatar_url: string;
  experience: string;
  initial_consultation: string;
  license: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
  specialization: string;
  id: string;
}

export interface PsychologistItemProps {
  data: Psychologist;
}

const PsychologistItem = ({ data }: PsychologistItemProps) => {
  return (
    <li>
      <p>{data.name}</p>
      <div>{data.specialization}</div>
    </li>
  );
};

export default PsychologistItem;
