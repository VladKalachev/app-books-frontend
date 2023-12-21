export interface IBook {
  id: number;
  title: string;
  description: string;
  genre: string;
  fullName: string;
  image: string;
  year: number;
  numberPages: number;
  publishing: boolean;
  notes: string;
  read: boolean;
  buy: boolean;
}
