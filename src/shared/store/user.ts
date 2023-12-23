import { makeAutoObservable } from "mobx";
import { 
  AuthResponse, 
  IUser } from "../types/users";
import AuthService from "../api/auth";
import axios from "axios";
import { API_URL } from "../plugins/http";

export default class UserStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(boo: boolean) {
    this.isLoading = boo;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {  withCredentials: true, });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
       console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}