import { useEffect } from 'react';
import s from './PsychologistsList.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPsychologists } from '@/store/psychologists/operations';
import { selectLoading, selectSortedPsychologists } from '@/store/psychologists/selectors';
import PsychologistItem from '@/components/PsychologistItem/PsychologistItem';
import Loader from '@/components/Button/Loader/Loader';

export interface PsychologistsListProps {}

const PsychologistsList = ({}: PsychologistsListProps) => {
  const dispatch = useAppDispatch();

  const psychologists = useAppSelector(selectSortedPsychologists);
  const loading = useAppSelector(selectLoading);

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
      {loading && <Loader className={s.loader} />}
    </div>
  );
};

export default PsychologistsList;
