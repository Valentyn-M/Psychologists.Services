import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <HeadProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <App />
              </SnackbarProvider>
            </LocalizationProvider>
          </HeadProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
