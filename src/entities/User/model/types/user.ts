import { IBook } from "@/entities/Book";

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  isAdmin: boolean;
}

export interface IUserWithBooks {
  email: string;
  isActivated: boolean;
  id: string;
  Books: IBook[];
}
