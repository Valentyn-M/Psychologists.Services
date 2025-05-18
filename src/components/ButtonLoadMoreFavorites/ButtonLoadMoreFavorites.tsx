import s from './ButtonLoadMoreFavorites.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavoriteEntities, selectFavoriteIds, selectFavoritesLoading } from '@/store/favorites/selectors';
import { fetchFavoritePsychologists } from '@/store/favorites/operations';
import { PAGE_SIZE } from '@/constants';
import { useEffect } from 'react';
import Button from '@/components/Button/Button';

export interface ButtonLoadMoreFavoritesProps {}

const ButtonLoadMoreFavorites = ({}: ButtonLoadMoreFavoritesProps) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const entities = useAppSelector(selectFavoriteEntities);
  const loading = useAppSelector(selectFavoritesLoading);

  const handleLoadMore = () => {
    const alreadyLoaded = entities.map((el) => el.id);
    const remaining = favoriteIds.filter((id) => !alreadyLoaded.includes(id));
    const nextIds = remaining.slice(0, PAGE_SIZE);
    if (nextIds.length > 0) {
      dispatch(fetchFavoritePsychologists(nextIds));
    }
  };

  useEffect(() => {
    handleLoadMore(); // перша порція
  }, []);

  return (
    <>
      {entities.length < favoriteIds.length && (
        <Button onClick={handleLoadMore} disabled={loading} className={s.btn}>
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </>
  );
};

export default ButtonLoadMoreFavorites;
