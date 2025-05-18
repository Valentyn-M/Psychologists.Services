import { useAppSelector } from '@/store/hooks';
import s from './FavoritesList.module.scss';
import { selectSortedFavorites } from '@/store/favorites/selectors';
import PsychologistItem from '@/components/PsychologistItem/PsychologistItem';

export interface FavoritesListProps {}

const FavoritesList = ({}: FavoritesListProps) => {
  const entities = useAppSelector(selectSortedFavorites);

  return (
    <div className={s.favoritesList}>
      <ul className={s.list}>
        {entities.map((psych) => (
          <PsychologistItem key={psych.id} data={psych} />
        ))}
      </ul>
      {/* TODO Add Loader */}
    </div>
  );
};

export default FavoritesList;
