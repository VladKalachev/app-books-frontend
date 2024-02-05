export interface IBook {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  genre?: string;
  fullName: string;
  image?: string;
  year?: number;
  numberPages?: number;
  publishing?: string;
  notes?: string;
  read?: boolean;
  buy?: boolean;
  authorId?: any;
}

export interface IBookCreate {
  title: string;
  description: string;
  genre?: string;
  fullName?: string;
  image?: string;
  year?: number;
  numberPages?: number;
  publishing?: string;
  notes?: string;
  read?: boolean;
  buy?: boolean;
  authorId?: any;
}
