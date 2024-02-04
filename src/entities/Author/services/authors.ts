import { AxiosResponse } from "axios";
import $api from "@/shared/plugins/http";
import { IAuthor } from "..";

export class AuthorsService {
  static fetchAuthors(): Promise<AxiosResponse<IAuthor[]>> {
    return $api.get<IAuthor[]>("/authors");
  }
}
