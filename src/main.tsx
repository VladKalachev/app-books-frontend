import { createRoot } from 'react-dom/client';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';

import '@/app/styles/index.scss';
import { ThemeProvider } from './app/providers/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>,
  // </React.StrictMode>
);
