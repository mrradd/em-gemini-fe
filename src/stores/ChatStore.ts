import { makeAutoObservable } from "mobx";
import type ChatResponseDto from "../dtos/ChatResponseDto";
import type ChatModel from "../models/ChatModel";
import ChatApi from "../apis/ChatApi";

export default class ChatStore {
  chats: ChatModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async sendChatRequest(prompt: string): Promise<ChatResponseDto | null> {
    const response: ChatResponseDto | null = await ChatApi.sendChat(prompt);
    return response;
  }

  async appendChat(chat: ChatModel) {
    this.chats = this.chats.concat(chat);
  }
}