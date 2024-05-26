import { IUser } from '@/entities/User/model/types/user';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
