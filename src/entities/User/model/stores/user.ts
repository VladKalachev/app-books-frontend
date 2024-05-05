import { makeAutoObservable, runInAction } from "mobx";

import AuthService from "../../../../shared/api/auth";
import axios from "axios";
import { API_URL } from "../../../../shared/plugins/http";
import { IUser } from "../types/user";
import { AuthResponse } from "@/shared/types/user";
import RootStore from "@/app/providers/StoreProvider/config/store";
import { NavigateFunction } from "react-router-dom";
import { getHomePage } from "@/shared/consts/router";

export class UserStore {
  rootStore: RootStore;
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
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

  async login(email: string, password: string, navigate: NavigateFunction) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      runInAction(() => {
        this.setAuth(true);
        this.setUser(response.data.user);
      });

      navigate(getHomePage());
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      runInAction(() => {
        this.setAuth(true);
        this.setUser(response.data.user);
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      runInAction(() => {
        this.setAuth(false);
        this.setUser({} as IUser);
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/user/refresh`,
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.accessToken);
      runInAction(() => {
        this.setAuth(true);
        this.setUser(response.data.user);
      });
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
