import { Psychologist } from '@/store/psychologists/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const firebaseRealtimeDatabaseAPI = axios.create({
  baseURL: 'https://psychologists-services-6b7df-default-rtdb.europe-west1.firebasedatabase.app',
});

export const fetchFavoritePsychologists = createAsyncThunk<
  Psychologist[],
  string[], // масив ID для завантаження
  { rejectValue: string }
>('favorites/fetchFavoritePsychologists', async (ids, thunkAPI) => {
  try {
    const requests = ids.map((id) => firebaseRealtimeDatabaseAPI.get<Psychologist>(`/${id}.json`));
    const responses = await Promise.all(requests);
    return responses.map((res, i) => ({ ...res.data, id: ids[i] }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});
