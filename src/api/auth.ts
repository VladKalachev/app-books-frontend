import $api from "../plugins/http";
import { AxiosResponse} from "axios";
import { AuthResponse } from "../types/users";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/login', { email, password });
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/registration', { email, password });
  }

  static async logout(): Promise<void> {
    $api.post<AuthResponse>('/user/logout');
  }
}