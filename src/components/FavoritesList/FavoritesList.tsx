import { useAppSelector } from '@/store/hooks';
import s from './FavoritesList.module.scss';
import { selectFavoritesLoading, selectSortedFavorites } from '@/store/favorites/selectors';
import PsychologistItem from '@/components/PsychologistItem/PsychologistItem';
import Loader from '@/components/Button/Loader/Loader';

export interface FavoritesListProps {}

const FavoritesList = ({}: FavoritesListProps) => {
  const entities = useAppSelector(selectSortedFavorites);
  const loading = useAppSelector(selectFavoritesLoading);

  return (
    <div className={s.favoritesList}>
      <ul className={s.list}>
        {entities.map((psych) => (
          <PsychologistItem key={psych.id} data={psych} />
        ))}
      </ul>
      {loading && <Loader className={s.loader} />}
    </div>
  );
};

export default FavoritesList;
