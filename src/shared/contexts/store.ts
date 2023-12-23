import { createContext } from 'react'
import RootStore from "../store/user";

const storeContext = createContext<RootStore | null>(null);

export default storeContext;