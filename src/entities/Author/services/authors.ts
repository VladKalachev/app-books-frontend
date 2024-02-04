import { AxiosResponse } from "axios";
import $api from "@/shared/plugins/http";
import { IAuthor } from "..";

export class AuthorsService {
  static fetchAuthors(): Promise<AxiosResponse<IAuthor[]>> {
    return $api.get<IAuthor[]>("/authors");
  }

  static addAuthor(formData: any): Promise<AxiosResponse<IAuthor>> {
    return $api.post<IAuthor>("/authors/create", formData);
  }
}
