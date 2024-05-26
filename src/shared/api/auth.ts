import $api from '../plugins/http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../types/user';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password });
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/registration', { email, password });
  }

  static async logout(): Promise<void> {
    $api.post<AuthResponse>('/auth/logout');
  }

  static async refresh(): Promise<void> {
    $api.get<AuthResponse>('/auth/refresh');
  }
}
