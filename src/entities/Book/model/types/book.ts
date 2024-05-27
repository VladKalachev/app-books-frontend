export interface IBook {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  genre?: string;
  fullName: string;
  file?: string;
  year?: number;
  numberPages?: number;
  publishing?: string;
  notes?: string;
  read?: boolean;
  buy?: boolean;
  authorId?: any;
  genreId?: any;
  publishingId?: any;
}

export interface IBookCreate {
  title: string;
  description: string;
  genre?: string;
  fullName?: string;
  file?: string;
  year?: number | null;
  numberPages?: number;
  publishing?: string;
  notes?: string;
  read?: boolean;
  buy?: boolean;
  authorId?: any;
  genreId?: any;
  publishingId?: any;
}
