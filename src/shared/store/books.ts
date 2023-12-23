import { makeAutoObservable } from "mobx";

export default class Books {
  constructor() {
    makeAutoObservable(this);
  }
}