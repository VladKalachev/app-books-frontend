import { IBook } from "@/entities/Book";

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface IUserWithBooks {
  email: string;
  isActivated: boolean;
  id: string;
  Books: IBook[];
}
