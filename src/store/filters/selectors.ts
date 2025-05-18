import { RootState } from '@/store/store';

export const selectValuePsychologists = (state: RootState) => state.filters.valuePsychologists;
export const selectValueFavorites = (state: RootState) => state.filters.valueFavorites;
