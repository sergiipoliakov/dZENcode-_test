import { StrictMode } from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import configureStore from './store';
import App from './App.tsx';
import '../styles/default.sass';


const store = configureStore({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </CookiesProvider>
    </Provider>
  </StrictMode>,
)
