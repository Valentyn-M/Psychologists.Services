import { selectValueFavorites } from '@/store/filters/selectors';
import { Psychologist } from '@/store/psychologists/slice';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectFavoriteIds = (state: RootState) => state.favorites.items;
export const selectFavoritesPage = (state: RootState) => state.favorites.page;
export const selectFavoriteEntities = (state: RootState) => state.favorites.entities;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;

// Сортування
export const selectSortedFavorites = createSelector(
  [selectFavoriteEntities, selectValueFavorites],
  (items, filterValue): Psychologist[] => {
    if (!items) return [];

    const sorted = [...items];

    switch (filterValue) {
      case '1': // A to Z
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case '2': // Z to A
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case '3': // Price: Low to High
        return sorted.sort((a, b) => b.price_per_hour - a.price_per_hour);
      case '4': // Price: High to Low
        return sorted.sort((a, b) => a.price_per_hour - b.price_per_hour);
      case '5': // Rating: High to Low
        return sorted.sort((a, b) => b.rating - a.rating);
      case '6': // Rating: Low to High
        return sorted.sort((a, b) => a.rating - b.rating);
      case '0': // Show all (без сортування)
      default:
        return items;
    }
  }
);
