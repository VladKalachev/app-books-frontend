import $api from "../plugins/http";
import { AxiosResponse} from "axios";
import { IBook } from "../types/books";

export default class BooksService {
  static fetchUBooks(): Promise<AxiosResponse<IBook[]>> {
    return $api.get<IBook[]>('/books')
  }
}