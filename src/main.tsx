import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import RootStore from './store/user.ts'
import storeContext from './contexts/store.js';

export const store = new RootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <storeContext.Provider value={store}>
      <App />
    </storeContext.Provider>
  </React.StrictMode>,
)
