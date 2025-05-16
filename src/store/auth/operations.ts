import { firebaseConfig } from '@/firebase/init';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = firebaseConfig.apiKey;

export const firebaseAPI = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});

interface Credentials {
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

// Реєстрація + оновлення профілю з ім'ям
export const registerUser = createAsyncThunk<
  RegisterResponse, // тип значення, що повертає fulfilled
  Credentials, // тип параметра, що передається у dispatch
  { rejectValue: string } // тип помилки
>('auth/registerUser', async (credentials, thunkAPI) => {
  try {
    const { email, password, displayName } = credentials;

    // 1. Створюємо користувача
    /*
     * POST @ /accounts:signUp?key=[API_KEY]
     * body: { email, password, returnSecureToken }
     */
    const res = await firebaseAPI.post(`/accounts:signUp?key=${API_KEY}`, {
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
    await firebaseAPI.post(`/accounts:update?key=${API_KEY}`, {
      idToken: token,
      displayName,
      returnSecureToken: true,
    });

    // 3. Повертаємо необхідні дані (додаємо ім’я вручну)
    return { ...res.data, displayName };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
