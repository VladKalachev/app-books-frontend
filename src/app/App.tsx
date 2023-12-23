
import { useContext, useEffect, useState } from 'react'
import LoginFormPage from '../pages/LoginPage/ui/LoginPage'
import './styles/App.css'
import storeContext from '../shared/contexts/store';
import { observer } from 'mobx-react-lite';
import BooksService from '../shared/api/books';
import { IBook } from '../shared/types/books';

function App() {
  const store = useContext(storeContext);
  const [books, setBooks] = useState<IBook[]>([]);

  
  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();   
      setBooks(bookList.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store?.checkAuth();
      getBooks();
    }
    () => {
      setBooks([]);
    }
  }, [store?.isAuth])

  if(store?.isLoading) {
    return <>Lading...</>
  }

  if(!store?.isAuth) {
    return <><LoginFormPage /></>
  }
 
  return (
    <div>
      <h1>{store?.isAuth ? `Пользователь авторизован ${store.user.email}`: "АВТОРИЗУЙТЕСЬ"}</h1>
      <h1>{store.user.isActivated ? "Аккаунт подтвержден по почте" : "ПОДТВЕРДИТE АККАУНТ!"}</h1>
      <button onClick={() => store?.logout()}>Выйти</button>

      <div>
        {books?.map((book) => (<div key={book?.id}>{book.title}</div>))}
      </div>
    </div>
  )
}

export default observer(App);
