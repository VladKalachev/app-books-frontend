import { AxiosResponse } from "axios";
import { IBook, IBookCreate } from "../types/book";
import $api from "@/shared/plugins/http";

export class BooksService {
  static fetchUBooks(): Promise<AxiosResponse<IBook[]>> {
    return $api.get<IBook[]>("/books");
  }

  static addBook(book: IBookCreate): Promise<AxiosResponse<IBook>> {
    return $api.post<IBook>("/books/create", book);
  }

  static getBookById(id: string): Promise<AxiosResponse<IBook>> {
    return $api.get<IBook>(`/books/${id}`);
  }

  static updateBook(
    id: string,
    book: IBookCreate
  ): Promise<AxiosResponse<IBook>> {
    return $api.put<IBook>(`/books/${id}`, book);
  }

  static deleteBookById(id: string): Promise<AxiosResponse<IBook>> {
    return $api.delete<IBook>(`/books/${id}`);
  }
}
