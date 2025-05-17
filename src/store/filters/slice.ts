import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FilterOption {
  ShowAll = '0',
  AtoZ = '1',
  ZtoA = '2',
  LessThan10 = '3',
  GreaterThan10 = '4',
  Popular = '5',
  NotPopular = '6',
}

interface FiltersState {
  value: FilterOption;
}

const initialState: FiltersState = {
  value: FilterOption.ShowAll,
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<FilterOption>) => {
      state.value = action.payload;
    },
  },
});

export const { changeFilter } = slice.actions;

export const filtersReducer = slice.reducer;
