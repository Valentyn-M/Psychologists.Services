import Button from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPsychologists } from '@/store/psychologists/operations';
import { selectItems, selectLoading } from '@/store/psychologists/selectors';
import s from './ButtonLoadMore.module.scss';

const ButtonLoadMore = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const items = useAppSelector(selectItems);

  // Беремо останній ключ із вже завантажених психологів
  const lastPsychologistId = items.length > 0 ? items[items.length - 1].id : undefined;

  const handleClick = () => {
    dispatch(fetchPsychologists({ startKey: lastPsychologistId }));
  };

  return (
    <Button disabled={loading} onClick={handleClick} className={s.btn}>
      {loading ? 'Loading...' : 'Load more'}
    </Button>
  );
};

export default ButtonLoadMore;
