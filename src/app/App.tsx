
import { useEffect } from 'react'
import LoginFormPage from '../pages/LoginPage/ui/LoginPage'
import './styles/App.css'

import { observer } from 'mobx-react-lite';

import useStore from './providers/StoreProvider/config/useStore';
import { AppRouter } from './providers/router';
function App() {
  const { user } = useStore();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      user?.checkAuth();
    }
  }, [user?.isAuth])

  if(user?.isLoading) {
    return <>Lading...</>
  }

  if(!user?.isAuth) {
    return <><LoginFormPage /></>
  }
 
  return (
    <div>
      <h1>{user?.isAuth ? `Пользователь авторизован ${user.user.email}`: "АВТОРИЗУЙТЕСЬ"}</h1>
      <h1>{user.user.isActivated ? "Аккаунт подтвержден по почте" : "ПОДТВЕРДИТE АККАУНТ!"}</h1>
      <button onClick={() => user?.logout()}>Выйти</button>
      <AppRouter />
    </div>
  )
}

export default observer(App);
