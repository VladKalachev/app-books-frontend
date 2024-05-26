import { BooksStore } from '@/entities/Book';
import { UserStore } from '@/entities/User';

class RootStore {
  user: UserStore;
  books: BooksStore;

  constructor() {
    this.user = new UserStore(this);
    this.books = new BooksStore(this);
  }
}

export default RootStore;
