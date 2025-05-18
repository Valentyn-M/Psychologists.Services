import { svgIcon } from '@/components/App';
import s from './ButtonFavorite.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addOrRemoveFavorite } from '@/store/favorites/slice';
import { selectFavoriteIds } from '@/store/favorites/selectors';
import { selectIsLoggedIn } from '@/store/auth/selectors';
import { useSnackbar } from 'notistack';

export interface ButtonFavoriteProps {
  id: string; // ID психолога
}

const ButtonFavorite = ({ id }: ButtonFavoriteProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const favorites = useAppSelector(selectFavoriteIds);
  const isFavorite = favorites.includes(id);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleClick = (): void => {
    if (!isLoggedIn) {
      enqueueSnackbar('Adding a psychologist to "Favorites" is only available to authorized users.', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      return;
    }

    dispatch(addOrRemoveFavorite(id));
  };

  return (
    <button
      type="button"
      className={s.btnFavorite}
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg className={isFavorite ? s.iconHeartFavorite : s.iconHeart}>
        <use href={`${svgIcon}#${isFavorite ? 'icon-heart-hover' : 'icon-heart'}`} />
      </svg>
    </button>
  );
};

export default ButtonFavorite;
