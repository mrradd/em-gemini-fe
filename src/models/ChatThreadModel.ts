import type ChatModel from "./ChatModel";

export default interface ChatThreadModel {
  id: string;
  title: string;
  chats: ChatModel[];
  createdDate: string;
  updatedDate: string;
}