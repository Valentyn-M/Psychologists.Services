import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <HeadProvider>
            <App />
          </HeadProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
