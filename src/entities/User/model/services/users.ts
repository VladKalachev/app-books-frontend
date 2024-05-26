import { IUser, IUserWithBooks } from '@/entities/User/model/types/user';
import $api from '../../../../shared/plugins/http';
import { AxiosResponse } from 'axios';

export class UsersService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static getUsersWithBooks(): Promise<AxiosResponse<IUserWithBooks[]>> {
    return $api.get<IUserWithBooks[]>('/users/usersWithBooks');
  }
}
