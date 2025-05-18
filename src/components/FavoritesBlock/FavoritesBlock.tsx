import s from './FavoritesBlock.module.scss';
import FavoritesList from '@/components/FavoritesList/FavoritesList';
import ButtonLoadMoreFavorites from '@/components/ButtonLoadMoreFavorites/ButtonLoadMoreFavorites';
import FiltersFavorites from '@/components/FiltersFavorites/FiltersFavorites';

export interface FavoritesBlockProps {}

const FavoritesBlock = ({}: FavoritesBlockProps) => {
  return (
    <section className={s.favoritesBlock}>
      <div className="container">
        <h1 className="visually-hidden">Your Favorite Psychologists</h1>
        <FiltersFavorites />
        <FavoritesList />
        <ButtonLoadMoreFavorites />
      </div>
    </section>
  );
};

export default FavoritesBlock;
