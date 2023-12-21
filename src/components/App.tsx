
import { useContext, useEffect } from 'react'
import LoginFormPage from '../pages/LoginFormPage'
import './App.css'
import storeContext from '../contexts/store';
import { observer } from 'mobx-react-lite';

function App() {
  const store = useContext(storeContext);
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store?.checkAuth();
    }
  }, [])

  if(store?.isLoading) {
    return <>Lading...</>
  }

  if(!store?.isAuth) {
    return <><LoginFormPage /></>
  }
 
  return (
    <div>
      <h1>{store?.isAuth ? `Пользователь авторизован ${store.user.email}`: "АВТОРИЗУЙТЕСЬ"}</h1>
      <button onClick={() => store?.logout()}>Выйти</button>
    </div>
  )
}

export default observer(App);
