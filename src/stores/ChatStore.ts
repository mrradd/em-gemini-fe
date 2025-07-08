import { makeAutoObservable } from "mobx";
import type ChatResponseDto from "../dtos/ChatResponseDto";
import type ChatModel from "../models/ChatModel";
import ChatApi from "../apis/ChatApi";
import type ChatThreadModel from "../models/ChatThreadModel";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";

export default class ChatStore {
  
  chats: ChatModel[] = [];
  chatThreads: ChatThreadModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async createNewChatThread(): Promise<ChatThreadResponseDto | null> {
    const response: ChatThreadResponseDto | null = await ChatApi.createNewChatThread();
    return response;
  }

  async sendChatRequest(prompt: string): Promise<ChatResponseDto | null> {
    const response: ChatResponseDto | null = await ChatApi.sendChat(prompt);
    return response;
  }

  async appendChat(chat: ChatModel) {
    this.chats = this.chats.concat(chat);
  }

  async appendChatThread(chatThread: ChatThreadModel) {
    this.chatThreads = this.chatThreads.concat(chatThread);
  }
}