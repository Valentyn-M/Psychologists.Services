import { fetchPsychologists } from '@/store/psychologists/operations';
import { createSlice } from '@reduxjs/toolkit';

export interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface Psychologist {
  about: string;
  avatar_url: string;
  experience: string;
  initial_consultation: string;
  license: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
  specialization: string;
  id: string;
}

export interface PsychologistsState {
  items: Psychologist[];
  loading: boolean;
  error: string | null;
}

const initialState: PsychologistsState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'psychologists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Prevent duplication by filtering the array (this happens because of StrictMode: in development mode, strict mode React intentionally runs useEffect twice)
        const newPsychologists = action.payload.filter(
          (newItem) => !state.items.some((existing) => existing.id === newItem.id)
        );
        state.items.push(...newPsychologists);
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const psychologistsReducer = slice.reducer;
