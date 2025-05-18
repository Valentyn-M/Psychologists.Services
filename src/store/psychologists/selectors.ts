import { selectValue } from '@/store/filters/selectors';
import { Psychologist } from '@/store/psychologists/slice';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectItems = (state: RootState) => state.psychologists.items;
export const selectLoading = (state: RootState) => state.psychologists.loading;

// Сортування
export const selectSortedAndFilteredPsychologists = createSelector(
  [selectItems, selectValue],
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
