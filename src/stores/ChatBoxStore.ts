import { makeAutoObservable } from "mobx";

export default class ChatBoxStore {
  textAreaContent: string = "";

  constructor(){
    makeAutoObservable(this);
  }

  setTextAreaContent(value: string) {
    this.textAreaContent = value;
  }
}