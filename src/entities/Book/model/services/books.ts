
import { AxiosResponse} from "axios";
import { IBook } from "../types/book";
import $api from "@/shared/plugins/http";


export class BooksService {
  static fetchUBooks(): Promise<AxiosResponse<IBook[]>> {
    return $api.get<IBook[]>('/books')
  }
}