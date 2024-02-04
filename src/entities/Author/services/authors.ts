import { AxiosResponse } from "axios";
import $api from "@/shared/plugins/http";
import { IAuthor, IAuthorCreate } from "..";

export class AuthorsService {
  static fetchAuthors(): Promise<AxiosResponse<IAuthor[]>> {
    return $api.get<IAuthor[]>("/authors");
  }

  static addAuthor(formData: any): Promise<AxiosResponse<IAuthor>> {
    return $api.post<IAuthor>("/authors/create", formData);
  }

  static getAuthorById(id: string): Promise<AxiosResponse<IAuthor>> {
    return $api.get<IAuthor>(`/authors/${id}`);
  }

  static updateAuthor(
    id: string,
    author: IAuthorCreate
  ): Promise<AxiosResponse<IAuthor>> {
    return $api.put<IAuthor>(`/authors/${id}`, author);
  }

  static deleteAuthorById(id: string): Promise<AxiosResponse<IAuthor>> {
    return $api.delete<IAuthor>(`/authors/${id}`);
  }
}
