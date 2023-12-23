import { ReactNode, createContext } from 'react';
import RootStore from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  const store = new RootStore();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}