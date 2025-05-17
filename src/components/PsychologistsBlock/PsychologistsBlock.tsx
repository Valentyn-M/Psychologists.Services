import Filters from '@/components/Filters/Filters';
import s from './PsychologistsBlock.module.scss';
import PsychologistsList from '@/components/PsychologistsList/PsychologistsList';
import ButtonLoadMore from '@/components/ButtonLoadMore/ButtonLoadMore';

export interface PsychologistsBlockProps {}

const PsychologistsBlock = ({}: PsychologistsBlockProps) => {
  return (
    <section className={s.psychologistsBlock}>
      <div className="container">
        <h1 className="visually-hidden">Our Psychologists</h1>
        <Filters />
        <PsychologistsList />
        <ButtonLoadMore />
      </div>
    </section>
  );
};

export default PsychologistsBlock;
