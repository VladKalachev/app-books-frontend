import RootStore from "@/app/providers/StoreProvider/config/store";
import { makeAutoObservable } from "mobx";

export class BooksStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
  }
}