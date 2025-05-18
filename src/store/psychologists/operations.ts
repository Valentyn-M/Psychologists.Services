import { PAGE_SIZE } from '@/constants';
import { Psychologist } from '@/store/psychologists/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const firebaseRealtimeDatabaseAPI = axios.create({
  baseURL: 'https://psychologists-services-6b7df-default-rtdb.europe-west1.firebasedatabase.app',
});

// Аргументи, які передаються у thunk при запиті
interface FetchPsychologistsArgs {
  startKey?: string; // ключ (ID) останнього елемента з попередньої порції
  limit?: number; // скільки елементів завантажити
}

// Основний thunk
export const fetchPsychologists = createAsyncThunk<
  Psychologist[], // Fulfilled повертає масив з доданим `id`
  FetchPsychologistsArgs | void, // аргументи не обовʼязкові
  { rejectValue: string } // тип помилки
>('psychologists/fetchPsychologists', async (args, thunkAPI) => {
  const { startKey, limit } = args ?? {};
  const safeStartKey = startKey ?? ''; // гарантуємо дефолт
  const safeLimit = (limit ?? PAGE_SIZE) + (startKey ? 1 : 0); // дефолтна порція — 3

  try {
    // Формуємо query-параметри
    const params = new URLSearchParams({
      orderBy: '"$key"', // сортування по ключу
      limitToFirst: String(safeLimit), // обмеження кількості
    });

    // Якщо вказано startKey — додаємо його до запиту
    if (safeStartKey) {
      params.append('startAt', `"${safeStartKey}"`);
    }

    // Запит до Firebase
    const response = await firebaseRealtimeDatabaseAPI.get<Record<string, Omit<Psychologist, 'id'>>>('/.json', {
      params,
    });

    // Перетворення обʼєкта у масив + додавання поля `id` з ключа
    let result = Object.entries(response.data).map(([id, data]) => ({
      ...data,
      id,
    }));

    // Якщо ми передавали startKey — треба пропустити перший (він вже є в списку)
    if (startKey) {
      result = result.slice(1);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});
