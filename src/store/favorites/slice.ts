import { fetchFavoritePsychologists } from '@/store/favorites/operations';
import { Psychologist } from '@/store/psychologists/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: string[]; // масив ID обраних психологів з localStorage
  entities: Psychologist[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem('favorites') ?? '[]'),
  entities: [],
  loading: false,
  error: null,
  page: 0,
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addOrRemoveFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.items.indexOf(id);
      if (index >= 0) {
        state.items.splice(index, 1); // видалити
      } else {
        state.items.push(id); // додати
      }
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritePsychologists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoritePsychologists.fulfilled, (state, action) => {
        state.loading = false;

        // Додати лише унікальні елементи
        const newPsychs = action.payload.filter(
          (newItem) => !state.entities.some((existing) => existing.id === newItem.id)
        );
        state.entities.push(...newPsychs);

        // Збільшити сторінку тільки якщо дійсно додано нові
        if (newPsychs.length > 0) {
          state.page += 1;
        }
      })
      .addCase(fetchFavoritePsychologists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { addOrRemoveFavorite } = slice.actions;

export const favoritesReducer = slice.reducer;
