import $api from "../plugins/http";
import { AxiosResponse} from "axios";
import { IUser } from "../types/users";

export default class UsersService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return  $api.get<IUser[]>('/users')
  }
}