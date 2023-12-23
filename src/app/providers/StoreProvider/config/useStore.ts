import { StoreContext } from '../ui/StoreProvider';
import { useContext } from 'react'
import RootStore from './store';


function useStore() {
  const store = useContext(StoreContext);
  return store as RootStore;
}

export default useStore