import Button from '@/components/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPsychologists } from '@/store/psychologists/operations';
import { selectHasMore, selectItems, selectLoading } from '@/store/psychologists/selectors';
import s from './ButtonLoadMore.module.scss';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export interface ButtonLoadMoreProps {}

const ButtonLoadMore = ({}: ButtonLoadMoreProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const items = useAppSelector(selectItems);
  const hasMore = useAppSelector(selectHasMore);

  const { enqueueSnackbar } = useSnackbar();

  // Беремо останній ключ із вже завантажених психологів
  const lastPsychologistId = items.length > 0 ? items[items.length - 1].id : undefined;

  const handleClick = () => {
    dispatch(fetchPsychologists({ startKey: lastPsychologistId }));
  };

  useEffect(() => {
    if (!hasMore && items.length > 0) {
      enqueueSnackbar('All available psychologists are loaded', { variant: 'info' });
    }
  }, [hasMore, items.length, enqueueSnackbar]);

  if (!hasMore) return null;

  return (
    <Button disabled={loading} onClick={handleClick} className={s.btn}>
      {loading ? 'Loading...' : 'Load more'}
    </Button>
  );
};

export default ButtonLoadMore;
