import { firebaseAuth, firebaseConfig } from '@/firebase/init';
import { RootState } from '@/store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getIdTokenResult, onAuthStateChanged } from 'firebase/auth';

const API_KEY = firebaseConfig.apiKey;

export const firebaseAuthenticationAPI = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});

interface RegisterCredentials {
  email: string;
  password: string;
  displayName: string;
}

interface RegisterResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string; // Firebase не гарантує, що поверне displayName при login
}

// Реєстрація + оновлення профілю з ім'ям
export const registerUser = createAsyncThunk<
  RegisterResponse, // тип значення, що повертає fulfilled
  RegisterCredentials, // тип параметра, що передається у dispatch
  { rejectValue: string } // тип помилки
>('auth/registerUser', async (credentials, thunkAPI) => {
  try {
    const { email, password, displayName } = credentials;

    // 1. Створюємо користувача
    /*
     * POST @ /accounts:signUp?key=[API_KEY]
     * body: { email, password, returnSecureToken }
     */
    const res = await firebaseAuthenticationAPI.post(`/accounts:signUp?key=${API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });

    const token = res.data.idToken;

    // 2. Додаємо ім’я користувача (displayName)
    /*
     * POST @ /accounts:update?key=[API_KEY]
     * body: { idToken, displayName, returnSecureToken }
     */
    await firebaseAuthenticationAPI.post(`/accounts:update?key=${API_KEY}`, {
      idToken: token,
      displayName,
      returnSecureToken: true,
    });

    // 3. Повертаємо необхідні дані (додаємо ім’я вручну)
    return { ...res.data, displayName };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

// Логін
/*
 * POST @ /accounts:signInWithPassword?key=[API_KEY]
 * body: { email, password, returnSecureToken }
 */
export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await firebaseAuthenticationAPI.post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        ...credentials,
        returnSecureToken: true,
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);

// Логаут
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    // Ендпоінта /accounts:signOut в Firebase REST API не існує.
    // Тому просто очищаємо client-side state
    // Firebase не потребує API-запиту для logout — достатньо стерти токен і обнулити дані користувача на клієнті.
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

// Перевірка токена (чи він протух: Firebase токени мають обмежений строк життя ~1 година)
// Перевірка можлива тільки через Firebase SDK, бо Firebase REST API цього не дозволяє
export const refreshUser = createAsyncThunk<
  { email: string; name: string }, // тип, який повертається
  void,
  { state: RootState; rejectValue: string }
>('auth/refreshUser', async (_, thunkAPI) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      unsubscribe(); // відписка одразу після спрацювання

      if (!user) {
        return reject(thunkAPI.rejectWithValue('No user session'));
      }

      try {
        await getIdTokenResult(user, true); // force refresh
        const name = user.displayName ?? '';
        const email = user.email ?? '';
        resolve({ email, name });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Unknown error');
      }
    });
  });
});
