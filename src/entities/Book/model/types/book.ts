export interface IBook {
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
  authorId?: string;
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
  authorId?: string;
}
