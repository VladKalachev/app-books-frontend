import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import RootStore from './shared/store/user.ts'
import storeContext from './shared/contexts/store.js';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.css'

export const store = new RootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <storeContext.Provider value={store}>
        <App />
      </storeContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
