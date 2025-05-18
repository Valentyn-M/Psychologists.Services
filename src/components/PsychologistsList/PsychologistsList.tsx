import { useEffect } from 'react';
import s from './PsychologistsList.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPsychologists } from '@/store/psychologists/operations';
import { selectSortedAndFilteredPsychologists } from '@/store/psychologists/selectors';
import PsychologistItem from '@/components/PsychologistItem/PsychologistItem';

export interface PsychologistsListProps {}

const PsychologistsList = ({}: PsychologistsListProps) => {
  const dispatch = useAppDispatch();

  const psychologists = useAppSelector(selectSortedAndFilteredPsychologists);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  return (
    <div className={s.psychologistsList}>
      <ul className={s.list}>
        {psychologists.map((item) => (
          <PsychologistItem key={item.id} data={item} />
        ))}
      </ul>
      {/* TODO Add Loader */}
    </div>
  );
};

export default PsychologistsList;
