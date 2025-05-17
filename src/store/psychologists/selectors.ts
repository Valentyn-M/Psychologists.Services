import { selectValue } from '@/store/filters/selectors';
import { Psychologist } from '@/store/psychologists/slice';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectItems = (state: RootState) => state.psychologists.items;
export const selectLoading = (state: RootState) => state.psychologists.loading;

// Сортування + фільтрація
export const selectSortedAndFilteredPsychologists = createSelector(
  [selectItems, selectValue],
  (items, filterValue): Psychologist[] => {
    if (!items) return [];

    const sorted = [...items];

    switch (filterValue) {
      case '1': // A to Z
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case '2': // Z to A
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case '3': // Less than 10$
        return sorted.filter((item) => item.price_per_hour < 10);
      case '4': // Greater than 10$
        return sorted.filter((item) => item.price_per_hour > 10);
      case '5': // Popular (>4.5)
        return sorted.filter((item) => item.rating > 4.5);
      case '6': // Not popular (<=4.5)
        return sorted.filter((item) => item.rating <= 4.5);
      case '0': // Show all
      default:
        break;
    }

    return sorted;
  }
);
