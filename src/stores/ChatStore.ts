import { makeAutoObservable } from "mobx";
import type ChatResponseDto from "../dtos/ChatResponseDto";
import type ChatModel from "../models/ChatModel";
import ChatApi from "../apis/ChatApi";
import type ChatThreadModel from "../models/ChatThreadModel";
import type ChatThreadResponseDto from "../dtos/ChatThreadResponseDto";
import type GetAllChatThreadsResponseDto from "../dtos/GetAllChatThreadsResponseDto";
import { dtoToChatThreadModel } from "../models/ChatThreadModel";

export default class ChatStore {
  chats = [] as ChatModel[];
  chatThreads = [] as ChatThreadModel[];
  workingChatThread = {} as ChatThreadModel;

  constructor() {
    makeAutoObservable(this);
  }

  appendChat(chat: ChatModel) {
    this.chats = this.chats.concat(chat);
  }

  appendChatThread(chatThread: ChatThreadModel) {
    this.chatThreads = this.chatThreads.concat(chatThread);
  }

  appendChatToThread(chat: ChatModel) {
    this.workingChatThread.chats = this.workingChatThread.chats.concat(chat);
  }

  async createNewChatThread(): Promise<ChatThreadResponseDto | null> {
    const response: ChatThreadResponseDto | null = await ChatApi.createNewChatThread();
    return response;
  }

  async deleteChatThread(threadId: string): Promise<boolean> {
    const response: boolean = await ChatApi.deleteChatThread(threadId);
    return response;
  }

  async getChatThread(chatThreadId: string): Promise<ChatThreadResponseDto | null> {
    const response: ChatThreadResponseDto | null = await ChatApi.getChatThreadData(chatThreadId);
    return response;
  }

  async getChatThreads(): Promise<GetAllChatThreadsResponseDto | null> {
    const response: GetAllChatThreadsResponseDto | null = await ChatApi.getAllChatThreads();
    return response;
  }

  async sendChatRequest(prompt: string): Promise<ChatResponseDto | null> {
    const response: ChatResponseDto | null = await ChatApi.sendChat(prompt, this.workingChatThread?.id);
    return response;
  }

  removeChatThread(threadId: string) {
    const idx = this.chatThreads.findIndex((thread) => { return thread.id === threadId; });

    //If we are viewing the Thread, we want to remove it from view.
    if(threadId === this.workingChatThread.id) {
      this.workingChatThread = {} as ChatThreadModel;
    }

    this.chatThreads.splice(idx, 1);
  }

  setWorkingChatThread(thread: ChatThreadResponseDto) {
    this.workingChatThread = dtoToChatThreadModel(thread);
  }
}