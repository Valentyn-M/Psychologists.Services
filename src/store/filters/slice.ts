import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FilterOption {
  ShowAll = '0',
  AtoZ = '1',
  ZtoA = '2',
  Expensive = '3',
  NotExpensive = '4',
  Popular = '5',
  NotPopular = '6',
}

interface FiltersState {
  valuePsychologists: FilterOption;
  valueFavorites: FilterOption;
}

const initialState: FiltersState = {
  valuePsychologists: FilterOption.ShowAll,
  valueFavorites: FilterOption.ShowAll,
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilterPsychologists: (state, action: PayloadAction<FilterOption>) => {
      state.valuePsychologists = action.payload;
    },
    changeFilterFavorites: (state, action: PayloadAction<FilterOption>) => {
      state.valueFavorites = action.payload;
    },
  },
});

export const { changeFilterPsychologists } = slice.actions;
export const { changeFilterFavorites } = slice.actions;

export const filtersReducer = slice.reducer;
