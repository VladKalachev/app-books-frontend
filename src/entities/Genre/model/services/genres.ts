import { AxiosResponse } from 'axios';
import $api from '@/shared/plugins/http';
import { IGenre, IGenreCreate } from '../types/genre';

export class GenresService {
  static fetchGenres(q: string = ''): Promise<AxiosResponse<IGenre[]>> {
    return $api.get<IGenre[]>(`/genres${q}`);
  }

  static addGenre(formData: any): Promise<AxiosResponse<IGenre>> {
    return $api.post<IGenre>('/genres/create', formData);
  }

  static getGenreById(id: string): Promise<AxiosResponse<IGenre>> {
    return $api.get<IGenre>(`/genres/${id}`);
  }

  static updateGenre(id: string, genre: IGenreCreate): Promise<AxiosResponse<IGenre>> {
    return $api.put<IGenre>(`/genres/${id}`, genre);
  }

  static deleteGenreById(id: string): Promise<AxiosResponse<IGenre>> {
    return $api.delete<IGenre>(`/genres/${id}`);
  }
}
